import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauBord2Component } from './tableau-bord2.component';

describe('TableauBord2Component', () => {
  let component: TableauBord2Component;
  let fixture: ComponentFixture<TableauBord2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableauBord2Component]
    });
    fixture = TestBed.createComponent(TableauBord2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
