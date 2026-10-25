import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SimulationService } from '../../services/simulation-service';
import { SimulationParameters } from '../../models/simulation-parameters';

@Component({
  selector: 'app-simulation-config-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './simulation-config-form.html',
  styleUrl: './simulation-config-form.css',
})
export class SimulationConfigForm implements OnInit {
  protected readonly simulationService = inject(SimulationService);
  private readonly fb = inject(FormBuilder);

  simForm!: FormGroup;

  ngOnInit(): void {
    this.simForm = this.fb.group({
      initialCapital: [100000, [Validators.required, Validators.min(1000)]],
      timeHorizonDays: [252, [Validators.required, Validators.min(10), Validators.max(1260)]],
      expectedReturn: [8.0, [Validators.required]],
      volatility: [18.0, [Validators.required, Validators.min(0.1)]],
      simulationCount: [5000, [Validators.required]],
      confidenceLevel: [0.95, [Validators.required]]
    });

    // Automatyczne pierwsze wywołanie po zainicjalizowaniu
    this.onSubmit();
  }

  onSubmit(): void {
    if (this.simForm.valid) {
      const params: SimulationParameters = this.simForm.value;
      this.simulationService.runSimulation(params);
    }
  }
}
