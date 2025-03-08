import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauBord1Component } from './tableau-bord1.component';

describe('TableauBord1Component', () => {
  let component: TableauBord1Component;
  let fixture: ComponentFixture<TableauBord1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableauBord1Component]
    });
    fixture = TestBed.createComponent(TableauBord1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
