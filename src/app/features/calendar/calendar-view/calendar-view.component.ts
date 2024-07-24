



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router} from '@angular/router';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentDialogComponent } from '../../../shared/appointment/appointment.component'; 
import { CalendarService } from '../../../services/calendar.service';
import { Appointment } from '../../../appointment.model';

@Component({
  selector: 'app-calendar-view',
  template: `
  <div>
     <div class="initial-container">
      <button mat-raised-button color="primary" (click)="handleClick(0)">Add Appointment</button>
      <button mat-raised-button color="accent" routerLink="/" (click)="goToHome()" >Go to Home</button>
    </div>
    <div cdkDropListGroup class="calendar">
      <div *ngFor="let day of days; let i = index"
        class="calendar-day"
        (click)="handleClick(i)"
        cdkDropList
        [cdkDropListData]="day.appointments"
        (cdkDropListDropped)="onDrop($event)"
        [id]="'day-' + i">
        <div class="day-header">
          {{ day.date | date: 'EEE, MMM d' }}
        </div>
        <div class="appointments">
          <div
            *ngFor="let appointment of day.appointments; let appIndex = index"
            class="appointment"
            cdkDrag
            [cdkDragData]="{ appointment, dayIndex: i, appIndex }">
            <span class='centerdate'>{{ appointment.time }} :{{ appointment.title }}</span>
            <button mat-icon-button color="primary" (click)="editAppointment(appointment, i, $event)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteAppointment(appointment, i, $event)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  `,
 styles:[`
  .initial-container {
  justify-content : end;
  display:flex;
  margin : 1rem;
  gap:2rem;
   }
  .calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 columns for days of the week */
  gap: 8px; /* Adjust the gap between days */
  padding: 1rem;
}

.calendar-week {
  display: contents; /* Allows the week to use the full width available */
}

.calendar-day {
  border: 1px solid gray;
  padding:1rem;
  border-radius: 0.5rem;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  box-sizing: border-box;
}

.day-header {
  text-align: center;
  margin-bottom: 0.5rem;
}

.appointments {
  display: flex;
  margin-bottom: 1rem;
  padding: 1rem ;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto; /* Allows scrolling if appointments overflow */
}

.centerdate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 0.5rem;
}

.appointment {
  background: lightblue;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

  `],
  standalone: true,
  imports: [CommonModule, DragDropModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class CalendarViewComponent implements OnInit {
  days: { date: Date, appointments: any[] }[] = [];

  constructor(public dialog: MatDialog, private router: Router,private calendarService : CalendarService) {}

  ngOnInit(): void {
    this.calendarService.days$.subscribe(days => {
      this.days = days;
    })
  }


  addAppointment(dayIndex: number): void {
    const targetDate = this.days[dayIndex].date;
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      data: { date: targetDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const appointment = {
          title: result.title,
          time: result.time,
          date: targetDate
        };
        this.calendarService.addAppointment(dayIndex, appointment); 
      }
    });
  }


  handleClick(index: number): void {
    this.addAppointment(index);
  }

  
  goToHome(): void {
    this.router.navigate(['/']);
  }

  editAppointment(appointment: any, dayIndex: number, event: Event): void {
    event.stopPropagation();
    const appointmentIndex = this.days[dayIndex].appointments.findIndex(app => app === appointment);
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      data: { date: this.days[dayIndex].date, appointment }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedAppointment = {
          title: result.title,
          time: result.time,
          date: result.date
        };
        this.calendarService.editAppointment(dayIndex, appointmentIndex, updatedAppointment);
      }
    });
  }
  deleteAppointment(appointment: any, dayIndex: number, event: Event): void {
    event.stopPropagation();
    const appointmentIndex = this.days[dayIndex].appointments.findIndex(app => app === appointment);
    if (appointmentIndex > -1) {
      this.calendarService.deleteAppointment(dayIndex, appointmentIndex);
    }
  }
  onDrop(event: CdkDragDrop<any[]>): void {
    const previousContainerId = event.previousContainer.id;
    const currentContainerId = event.container.id;
  
    if (previousContainerId !== currentContainerId) {
      const previousDayIndex = parseInt(previousContainerId.replace('day-', ''), 10);
      const currentDayIndex = parseInt(currentContainerId.replace('day-', ''), 10);
  
      const itemIndex = event.item.data.appointmentIndex;
      this.calendarService.moveAppointment(previousDayIndex, currentDayIndex, itemIndex);
    }
  }
}
