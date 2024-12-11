import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingpointListComponent } from './chargingpoint-list.component';

describe('ChargingpointListComponent', () => {
  let component: ChargingpointListComponent;
  let fixture: ComponentFixture<ChargingpointListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargingpointListComponent]
    });
    fixture = TestBed.createComponent(ChargingpointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
