import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingpointCreateComponent } from './chargingpoint-create.component';

describe('ChargingpointCreateComponent', () => {
  let component: ChargingpointCreateComponent;
  let fixture: ComponentFixture<ChargingpointCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargingpointCreateComponent]
    });
    fixture = TestBed.createComponent(ChargingpointCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
