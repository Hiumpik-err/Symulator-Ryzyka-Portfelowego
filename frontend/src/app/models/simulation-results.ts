import { DistributionHistogram } from "./distribution-histogram";
import { PercentileBands } from "./percentile-bands";

// 4. Pełna odpowiedź zwracana z backendu (API Response DTO)
export interface SimulationResults {
  medianFinalValue: number;     // Przewidywana wartość mediana na koniec horyzontu
  returnPercentage: number;     // Procentowy zwrot mediany względem kapitału początkowego
  valueAtRisk: number;          // Wartość VaR (kwota maksymalnej oczekiwanej straty)
  confidenceLevel: number;      // Wybrany poziom ufności (np. 0.95)
  profitProbability: number;    // Szansa na zysk (%)
  samplePoints: number[];       // Punkty czasowe na osi X (np. dni: [0, 5, 10, ..., 252])
  percentiles: PercentileBands; // Dane do wykresu ścieżek
  histogram: DistributionHistogram; // Dane do histogramu
}