import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurListComponent } from './formateur-list.component';

describe('FormateurListComponent', () => {
  let component: FormateurListComponent;
  let fixture: ComponentFixture<FormateurListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormateurListComponent]
    });
    fixture = TestBed.createComponent(FormateurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
