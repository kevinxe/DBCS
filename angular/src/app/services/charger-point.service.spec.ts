import { TestBed } from '@angular/core/testing';

import { ChargingPointService } from './charger-point.service';

describe('ChargerPointService', () => {
  let service: ChargingPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargingPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
