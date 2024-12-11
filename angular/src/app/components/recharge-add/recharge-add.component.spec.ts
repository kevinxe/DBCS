import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeAddComponent } from './recharge-add.component';

describe('RechargeAddComponent', () => {
  let component: RechargeAddComponent;
  let fixture: ComponentFixture<RechargeAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechargeAddComponent]
    });
    fixture = TestBed.createComponent(RechargeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
