import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';

export const routes: Routes = [
  { path: '', component: TodoListComponent }, 
  {
    path: 'feature',
    loadComponent: () =>
      import('./feature/feature.component').then((m) => m.FeatureComponent),
  },
];