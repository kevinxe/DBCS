import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListAllComponent } from './vehicle-list-all.component';

describe('VehicleListAllComponent', () => {
  let component: VehicleListAllComponent;
  let fixture: ComponentFixture<VehicleListAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleListAllComponent]
    });
    fixture = TestBed.createComponent(VehicleListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
