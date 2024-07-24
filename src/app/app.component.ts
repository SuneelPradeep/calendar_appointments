import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDialogComponent } from './shared/appointment/appointment.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AppCalendarModule } from './calendar.module'; 

@Component({
  selector: 'app-root',
  template: `
    <router-outlet>  </router-outlet>

  `,
  styles: [`
    
  `],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule, RouterOutlet,
    AppCalendarModule, 
  ]
})
export class AppComponent {
 
  constructor(public dialog: MatDialog, private router: Router) {}

}
