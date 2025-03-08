import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAcueilComponent } from './page-acueil.component';

describe('PageAcueilComponent', () => {
  let component: PageAcueilComponent;
  let fixture: ComponentFixture<PageAcueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageAcueilComponent]
    });
    fixture = TestBed.createComponent(PageAcueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
