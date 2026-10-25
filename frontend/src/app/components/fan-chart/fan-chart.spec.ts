import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanChart } from './fan-chart';

describe('FanChart', () => {
  let component: FanChart;
  let fixture: ComponentFixture<FanChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FanChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FanChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
