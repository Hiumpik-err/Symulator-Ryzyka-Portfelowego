import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationConfigForm } from './simulation-config-form';

describe('SimulationConfigForm', () => {
  let component: SimulationConfigForm;
  let fixture: ComponentFixture<SimulationConfigForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationConfigForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulationConfigForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
