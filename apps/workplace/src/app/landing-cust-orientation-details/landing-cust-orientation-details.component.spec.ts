import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCustOrientationDetailsComponent } from './landing-cust-orientation-details.component';

describe('LandingCustOrientationDetailsComponent', () => {
  let component: LandingCustOrientationDetailsComponent;
  let fixture: ComponentFixture<LandingCustOrientationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingCustOrientationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingCustOrientationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
