import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroGastoPage } from './cadastro-gasto.page';

describe('CadastroGastoPage', () => {
  let component: CadastroGastoPage;
  let fixture: ComponentFixture<CadastroGastoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroGastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
