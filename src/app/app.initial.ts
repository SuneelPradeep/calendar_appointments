
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDialogComponent } from './shared/appointment/appointment.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AppCalendarModule } from './calendar.module'; 
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-initial',
  template: `
  <div>
    <div class="initial-container">
      <button mat-raised-button color="primary" (click)="openAppointmentDialog()">Add Appointment</button>
      <button mat-raised-button color="accent" routerLink="calendar" (click) = "goToAppointment()" >Go to Appointments</button>
    </div>
    <div class="calendar-container">
      <mwl-calendar-month-view
        [viewDate]="viewDate"
        [events]="events"
        (dayClicked)="dayClicked($event.day)">
      </mwl-calendar-month-view>
    </div>
    

  `,
  styles: [`
        .initial-container {
                justify-content : end;
                display:flex;
                margin : 1rem;
                gap:2rem;
        }
    .calendar-container {
        padding: 2rem;
        }
  `],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule, RouterOutlet,
    AppCalendarModule, 
  ]
})
export class AppInitial {
  viewDate: Date = new Date();
  events: any[] = [];

  constructor(public dialog: MatDialog, private router: Router,private calendarService : CalendarService) {}

openAppointmentDialog(): void {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      data: { date: new Date() }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const appointment = {
          title: result.title,
          time: result.time,
          date: new Date()
        };
       
        this.calendarService.addAppointment(Number(new Date().getDate()), appointment);
        this.router.navigate(['/calendar']); 
      }
    });
  }
  dayClicked(day: any): void {
    this.router.navigate(['/calendar']);
  }
  goToAppointment(): void{
    this.router.navigate(['/calendar'])
  }
}
