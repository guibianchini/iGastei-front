import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PorBancoPage } from './por-banco.page';

describe('PorBancoPage', () => {
  let component: PorBancoPage;
  let fixture: ComponentFixture<PorBancoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PorBancoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
