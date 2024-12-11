import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesDeniedComponentComponent } from './acces-denied-component.component';

describe('AccesDeniedComponentComponent', () => {
  let component: AccesDeniedComponentComponent;
  let fixture: ComponentFixture<AccesDeniedComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccesDeniedComponentComponent]
    });
    fixture = TestBed.createComponent(AccesDeniedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
