import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DistributionHistogram } from './components/distribution-histogram/distribution-histogram';
import { FanChart } from './components/fan-chart/fan-chart';
import { KpiCards } from './components/kpi-cards/kpi-cards';
import { SimulationConfigForm } from './components/simulation-config-form/simulation-config-form';
import { SimulationDashboard } from './components/simulation-dashboard/simulation-dashboard';


@Component({
  selector: 'app-root',
  imports: [
    DistributionHistogram,
    FanChart,
    KpiCards,
    SimulationConfigForm,
    SimulationDashboard
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
