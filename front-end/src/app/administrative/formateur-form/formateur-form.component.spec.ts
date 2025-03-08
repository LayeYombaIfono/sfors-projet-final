import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurFormComponent } from './formateur-form.component';

describe('FormateurFormComponent', () => {
  let component: FormateurFormComponent;
  let fixture: ComponentFixture<FormateurFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormateurFormComponent]
    });
    fixture = TestBed.createComponent(FormateurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
