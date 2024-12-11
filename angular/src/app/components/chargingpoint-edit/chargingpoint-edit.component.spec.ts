import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingpointEditComponent } from './chargingpoint-edit.component';

describe('ChargingpointEditComponent', () => {
  let component: ChargingpointEditComponent;
  let fixture: ComponentFixture<ChargingpointEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargingpointEditComponent]
    });
    fixture = TestBed.createComponent(ChargingpointEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
