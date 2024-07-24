import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Appointment, Day } from '../appointment.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private daysSubject = new BehaviorSubject<any[]>([]);
  days$ = this.daysSubject.asObservable().pipe(
    tap(days => console.log('Days updated:', days))
  );

  constructor() {
    this.generateCalendar();
  }

  private generateCalendar(): void {
    const days :Day[]= [];
    const start = new Date();
    start.setDate(1);
    const month = start.getMonth();
    const year = start.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
      days.push({ date: new Date(year, month, -i), appointments: [] });
    }

    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
      days.push({ date: new Date(year, month, i), appointments: [] });
    }
    if (days.length > 0) {
        days[0].appointments.push({
          title: 'Wake Up',
          time: '5:00 AM',
          date: days[0].date
        });
      }
      
      if (days.length > 1) {
        days[1].appointments.push({
          title: 'Eat food',
          time: '9:00 AM',
          date: days[1].date
        });
      }
    
    this.daysSubject.next(days);
  }

  addAppointment(dayIndex: number, appointment: Appointment): void {
    const currentDays = this.daysSubject.getValue();
    currentDays[dayIndex].appointments.push(appointment);
    this.daysSubject.next([...currentDays]);
  }


  editAppointment(dayIndex: number, appointmentIndex: number, updatedAppointment: any): void {
    const days = this.daysSubject.getValue();
    if (days[dayIndex] && days[dayIndex].appointments[appointmentIndex]) {
      days[dayIndex].appointments[appointmentIndex] = updatedAppointment;
      this.daysSubject.next(days);
    } else {
      console.error('Invalid dayIndex or appointmentIndex');
    }
  }
  deleteAppointment(dayIndex: number, appointmentIndex: number): void {
    const days = this.daysSubject.getValue();
    if (days[dayIndex] && days[dayIndex].appointments[appointmentIndex]) {
      days[dayIndex].appointments.splice(appointmentIndex, 1);
      this.daysSubject.next(days);
    } else {
      console.error('Invalid dayIndex or appointmentIndex');
    }
  }
  moveAppointment(previousDayIndex: number, currentDayIndex: number, appointmentIndex: number): void {
    const currentDays = this.daysSubject.getValue();
    const [appointment] = currentDays[previousDayIndex].appointments.splice(appointmentIndex, 1);
    if (appointment) {
      currentDays[currentDayIndex].appointments.push(appointment);
      this.daysSubject.next([...currentDays]);
    }
  }
}
