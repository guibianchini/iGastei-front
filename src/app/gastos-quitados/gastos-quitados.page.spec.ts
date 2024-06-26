import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GastosQuitadosPage } from './gastos-quitados.page';

describe('GastosQuitadosPage', () => {
  let component: GastosQuitadosPage;
  let fixture: ComponentFixture<GastosQuitadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosQuitadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
