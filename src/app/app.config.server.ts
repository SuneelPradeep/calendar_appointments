// // import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
// // import { provideServerRendering } from '@angular/platform-server';
// // import { appConfig } from './app.config';

// // const serverConfig: ApplicationConfig = {
// //   providers: [
// //     provideServerRendering()
// //   ]
// // };

// // export const config = mergeApplicationConfig(appConfig, serverConfig);

// import { provideRouter } from '@angular/router';
// import { Routes } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
// import { AppComponent } from './app.component';
// import { CalendarViewComponent } from './features/calendar/calendar-view/calendar-view.component';

// // Define routes
// const routes: Routes = [
//   { path: '', component: AppComponent },
//   { 
//     path: 'calendar', 
//     loadComponent: () => import('./features/calendar/calendar-view/calendar-view.component').then(m => m.CalendarViewComponent) 
//   },
// ];

// // Define and export config
// export const config = {
//   providers: [
//     provideRouter(routes),
//     // other providers if needed
//   ],
// };
