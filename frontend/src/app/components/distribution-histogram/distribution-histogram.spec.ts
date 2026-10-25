import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionHistogram } from './distribution-histogram';

describe('DistributionHistogram', () => {
  let component: DistributionHistogram;
  let fixture: ComponentFixture<DistributionHistogram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributionHistogram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributionHistogram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
