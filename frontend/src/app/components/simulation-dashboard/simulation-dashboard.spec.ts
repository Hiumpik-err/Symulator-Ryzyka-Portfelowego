import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationDashboard } from './simulation-dashboard';

describe('SimulationDashboard', () => {
  let component: SimulationDashboard;
  let fixture: ComponentFixture<SimulationDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulationDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
