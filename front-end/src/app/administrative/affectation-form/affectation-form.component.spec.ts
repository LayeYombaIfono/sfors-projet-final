import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationFormComponent } from './affectation-form.component';

describe('AffectationFormComponent', () => {
  let component: AffectationFormComponent;
  let fixture: ComponentFixture<AffectationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffectationFormComponent]
    });
    fixture = TestBed.createComponent(AffectationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
