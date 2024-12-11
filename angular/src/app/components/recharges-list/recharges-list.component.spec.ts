import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargesListComponent } from './recharges-list.component';

describe('RechargeListComponent', () => {
  let component: RechargesListComponent;
  let fixture: ComponentFixture<RechargesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechargesListComponent]
    });
    fixture = TestBed.createComponent(RechargesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
