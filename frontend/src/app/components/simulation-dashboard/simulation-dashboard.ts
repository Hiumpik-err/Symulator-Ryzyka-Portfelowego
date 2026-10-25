import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SimulationConfigForm } from '../simulation-config-form/simulation-config-form';
import { KpiCards } from '../kpi-cards/kpi-cards';
import { FanChart } from '../fan-chart/fan-chart';
import { DistributionHistogram } from '../distribution-histogram/distribution-histogram';

@Component({
  selector: 'app-simulation-dashboard',
  standalone: true,
  imports: [CommonModule,
    SimulationConfigForm,
    KpiCards,
    FanChart,
    DistributionHistogram],
  templateUrl: './simulation-dashboard.html',
  styleUrl: './simulation-dashboard.css',
})
export class SimulationDashboard {

}
