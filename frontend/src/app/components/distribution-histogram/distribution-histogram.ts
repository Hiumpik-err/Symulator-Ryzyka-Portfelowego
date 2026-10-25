import { AfterViewInit, Component, effect, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { SimulationResults } from '../../models/simulation-results';
import { SimulationService } from '../../services/simulation-service';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-distribution-histogram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './distribution-histogram.html',
  styleUrl: './distribution-histogram.css',
})
export class DistributionHistogram implements AfterViewInit, OnDestroy {
  @ViewChild('histogramCanvas') private histogramCanvas!: ElementRef<HTMLCanvasElement>;
  private readonly simulationService = inject(SimulationService);
  private chartInstance: Chart | null = null;

  constructor() {
    effect(() => {
      const res = this.simulationService.results();
      if (res && this.histogramCanvas) {
        this.renderHistogram(res);
      }
    });
  }

  ngAfterViewInit(): void {
    const res = this.simulationService.results();
    if (res) this.renderHistogram(res);
  }

  private renderHistogram(res: SimulationResults): void {
    if (this.chartInstance) this.chartInstance.destroy();

    const ctx = this.histogramCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const colors = res.histogram.frequencies.map((_, i) => 
      i <= res.histogram.varCutoffIndex ? 'rgba(244, 63, 94, 0.75)' : 'rgba(99, 102, 241, 0.75)'
    );

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: res.histogram.labels,
        datasets: [{
          label: 'Liczba Symulacji w Koszyku',
          data: res.histogram.frequencies,
          backgroundColor: colors,
          borderRadius: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#64748b', maxTicksLimit: 10 }, grid: { display: false } },
          y: { ticks: { color: '#64748b' }, grid: { color: '#1e293b' } }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.chartInstance) this.chartInstance.destroy();
  }
}
