import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: () => {
      return 'home';
    },
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/todo/pages/board-page/board-page').then((m) => m.BoardPage),
  },
  {
    path: 'board',
    loadComponent: () =>
      import('./features/todo/pages/board-page/board-page').then((m) => m.BoardPage),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
