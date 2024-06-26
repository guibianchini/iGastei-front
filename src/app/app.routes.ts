import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cadastro-gasto',
    loadComponent: () => import('./cadastro-gasto/cadastro-gasto.page').then( m => m.CadastroGastoPage)
  },
  {
    path: 'editar-gasto',
    loadComponent: () => import('./editar-gasto/editar-gasto.page').then( m => m.EditarGastoPage)
  },
];