import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarGastoPage } from './editar-gasto.page';

describe('EditarGastoPage', () => {
  let component: EditarGastoPage;
  let fixture: ComponentFixture<EditarGastoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
