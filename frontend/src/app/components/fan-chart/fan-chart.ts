import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { SimulationService } from '../../services/simulation-service';
import { SimulationResults } from '../../models/simulation-results';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-fan-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fan-chart.html',
  styleUrl: './fan-chart.css',
})
export class FanChart implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') private chartCanvas!: ElementRef<HTMLCanvasElement>;
  private readonly simulationService = inject(SimulationService);
  private chartInstance: Chart | null = null;

  constructor() {
    // Reaktywne odświeżanie wykresu przy zmianie Signal wyników
    effect(() => {
      const res = this.simulationService.results();
      if (res && this.chartCanvas) {
        this.renderChart(res);
      }
    });
  }

  ngAfterViewInit(): void {
    const res = this.simulationService.results();
    if (res) this.renderChart(res);
  }

  private renderChart(res: SimulationResults): void {
    if (this.chartInstance) this.chartInstance.destroy();

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: res.samplePoints.map(p => 'Dzień ' + p),
        datasets: [
          { label: '95. Percentyl', data: res.percentiles.p95, borderColor: 'rgba(99, 102, 241, 0.4)', borderWidth: 1, pointRadius: 0 },
          { label: '75. Percentyl', data: res.percentiles.p75, borderColor: 'rgba(99, 102, 241, 0.7)', borderWidth: 1.5, pointRadius: 0, fill: '-1', backgroundColor: 'rgba(99, 102, 241, 0.1)' },
          { label: 'Mediana (50.)', data: res.percentiles.p50, borderColor: '#6366f1', borderWidth: 2.5, pointRadius: 0 },
          { label: '25. Percentyl', data: res.percentiles.p25, borderColor: 'rgba(99, 102, 241, 0.7)', borderWidth: 1.5, pointRadius: 0, fill: '-1', backgroundColor: 'rgba(99, 102, 241, 0.1)' },
          { label: '5. Percentyl (Ryzyko VaR)', data: res.percentiles.p5, borderColor: '#f43f5e', borderWidth: 2, pointRadius: 0, fill: '-1', backgroundColor: 'rgba(244, 63, 94, 0.1)' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: { legend: { display: true, labels: { color: '#94a3b8', boxWidth: 12 } } },
        scales: {
          x: { ticks: { color: '#64748b', maxTicksLimit: 8 }, grid: { color: '#1e293b' } },
          y: { ticks: { color: '#64748b', callback: (v: any) => '$' + Number(v).toLocaleString() }, grid: { color: '#1e293b' } }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.chartInstance) this.chartInstance.destroy();
  }
}