import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleValidchargerComponent } from './vehicle-validcharger.component';

describe('VehicleValidchargerComponent', () => {
  let component: VehicleValidchargerComponent;
  let fixture: ComponentFixture<VehicleValidchargerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleValidchargerComponent]
    });
    fixture = TestBed.createComponent(VehicleValidchargerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
