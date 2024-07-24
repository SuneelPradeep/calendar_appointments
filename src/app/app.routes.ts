import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppInitial } from './app.initial';

export const routes: Routes = [
  { path: '', component: AppInitial },
  { 
    path: 'calendar', 
    loadComponent: () => import('./features/calendar/calendar-view/calendar-view.component').then(m => m.CalendarViewComponent) 
  },
  
];
