import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SimulationService } from '../../services/simulation-service';

@Component({
  selector: 'app-kpi-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-cards.html',
  styleUrl: './kpi-cards.css',
})
export class KpiCards {
  private readonly simulationService = inject(SimulationService);
  readonly results = this.simulationService.results;
}
