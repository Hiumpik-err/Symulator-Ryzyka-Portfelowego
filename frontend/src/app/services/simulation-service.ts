import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, finalize, of, tap } from 'rxjs';
import { SimulationResults } from '../models/simulation-results';
import { SimulationParameters } from '../models/simulation-parameters';


@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/simulation'; // Adres Twojego backendu w C# / ASP.NET Core

  // Nowoczesne zarządzanie stanem za pomocą Signal z Angular 16+
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly results = signal<SimulationResults | null>(null);

  /**
   * Główna metoda wywoływana przez formularz w komponencie.
   * Wysyła zapytanie do backendu lub używa fallbacku lokalnego.
   */
  runSimulation(params: SimulationParameters): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Wywołanie produkcyjne do backendu w C# (REST API / ASP.NET Core z Parallel.For)
    this.http.post<SimulationResults>(`${this.apiUrl}/run`, params).pipe(
      tap((data) => {
        this.results.set(data);
      }),
      catchError((err) => {
        console.warn('Backend niedostępny, uruchamiam lokalny silnik symulacyjny w przeglądarce...', err);
        // Fallback: Obliczenie symulacji lokalnie na frontendzie (np. podczas prac nad UI bez włączonego backendu)
        const localResults = this.runLocalSimulationEngine(params);
        this.results.set(localResults);
        return of(null);
      }),
      finalize(() => {
        this.isLoading.set(false);
      })
    ).subscribe();
  }

  /**
   * Klientowy silnik stochastyczny (Geometric Brownian Motion + Box-Muller).
   * Służy jako mock/fallback do testowania UI oraz jako punkt odniesienia dla backendu.
   */
  private runLocalSimulationEngine(params: SimulationParameters): SimulationResults {
    const dt = 1 / 252;
    const mu = params.expectedReturn / 100.0;
    const sigma = params.volatility / 100.0;
    const drift = (mu - 0.5 * sigma * sigma) * dt;
    const volDt = sigma * Math.sqrt(dt);

    const days = params.timeHorizonDays;
    const N = params.simulationCount;

    // Próbkowanie punktów czasowych na osi X dla zmniejszenia obciążenia pamięci
    const sampleInterval = Math.max(1, Math.floor(days / 50));
    const samplePoints: number[] = [];
    for (let d = 0; d <= days; d += sampleInterval) samplePoints.push(d);
    if (samplePoints[samplePoints.length - 1] !== days) samplePoints.push(days);

    const stepValuesMap: Record<number, number[]> = {};
    samplePoints.forEach(sp => (stepValuesMap[sp] = []));

    const finalValues: number[] = [];

    // Pętla symulacji ścieżek Monte Carlo
    for (let i = 0; i < N; i++) {
      let currentVal = params.initialCapital;
      if (stepValuesMap[0]) stepValuesMap[0].push(currentVal);

      for (let d = 1; d <= days; d++) {
        const z = this.randomNormal();
        currentVal = currentVal * Math.exp(drift + volDt * z);

        if (stepValuesMap[d]) {
          stepValuesMap[d].push(currentVal);
        }
      }
      finalValues.push(currentVal);
    }

    // Wyliczanie percentyli dla wstęgi ufności (Fan Chart)
    const getPercentile = (arr: number[], p: number): number => {
      const sorted = [...arr].sort((a, b) => a - b);
      const index = Math.floor(p * sorted.length);
      return sorted[Math.min(index, sorted.length - 1)];
    };

    const p5: number[] = [];
    const p25: number[] = [];
    const p50: number[] = [];
    const p75: number[] = [];
    const p95: number[] = [];

    samplePoints.forEach(sp => {
      const vals = stepValuesMap[sp];
      p5.push(getPercentile(vals, 0.05));
      p25.push(getPercentile(vals, 0.25));
      p50.push(getPercentile(vals, 0.50));
      p75.push(getPercentile(vals, 0.75));
      p95.push(getPercentile(vals, 0.95));
    });

    // Wskaźniki statystyczne & VaR
    const medianFinal = getPercentile(finalValues, 0.50);
    const varCutoffPercentile = 1.0 - params.confidenceLevel;
    const varValueAtPercentile = getPercentile(finalValues, varCutoffPercentile);
    const valueAtRisk = Math.max(0, params.initialCapital - varValueAtPercentile);
    const profitableCount = finalValues.filter(v => v > params.initialCapital).length;
    const profitProbability = parseFloat(((profitableCount / N) * 100).toFixed(1));
    const returnPercentage = parseFloat((((medianFinal - params.initialCapital) / params.initialCapital) * 100).toFixed(1));

    // Budowanie danych pod Histogram
    const binCount = 30;
    const min = Math.min(...finalValues);
    const max = Math.max(...finalValues);
    const binWidth = (max - min) / binCount;
    const frequencies = Array(binCount).fill(0);
    const labels: string[] = [];
    let varCutoffIndex = -1;

    for (let i = 0; i < binCount; i++) {
      const binStart = min + i * binWidth;
      labels.push('$' + Math.round(binStart / 1000) + 'k');
      if (binStart <= varValueAtPercentile) {
        varCutoffIndex = i;
      }
    }

    finalValues.forEach(v => {
      let idx = Math.floor((v - min) / binWidth);
      if (idx >= binCount) idx = binCount - 1;
      frequencies[idx]++;
    });

    return {
      medianFinalValue: Math.round(medianFinal),
      returnPercentage,
      valueAtRisk: Math.round(valueAtRisk),
      confidenceLevel: params.confidenceLevel,
      profitProbability,
      samplePoints,
      percentiles: { p5, p25, p50, p75, p95 },
      histogram: {
        labels,
        frequencies,
        varCutoffIndex,
        varCutoffValue: varValueAtPercentile
      }
    };
  }

  /**
   * Generator pseudolosowy rozkładu normalnego N(0,1) - Transformacja Boxa-Mullera
   */
  private randomNormal(): number {
    let u1 = Math.random();
    let u2 = Math.random();
    while (u1 === 0) u1 = Math.random();
    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  }
}