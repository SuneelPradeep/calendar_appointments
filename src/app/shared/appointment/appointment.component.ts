import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-appointment-dialog',
  template: `
  <div class="appointmentform">
    <h1 class='title' mat-dialog-title>{{ data.appointment ? 'Edit Appointment' : 'New Appointment' }}</h1>
    <div mat-dialog-content>
      <form [formGroup]="appointmentForm" class='form'>
        <mat-form-field appearance="outline" class='formtitle'>
          <mat-label>Title</mat-label>
          <input matInput formControlName="title">
        </mat-form-field >
        <mat-form-field appearance="outline" >
          <mat-label>Time</mat-label>
          <input matInput type="time" formControlName="time">
        </mat-form-field>
        <p>Date: {{ data.date | date: 'EEE, MMM d' }}</p>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="primary" (click)="onSave()">Save</button>
    </div>
    </div>
  `,
  styles: [`
    .appointmentform {
    padding : 4rem;
    }
    .title
    { text-align :center;
    }
    .formtitle{
    margin-right:0.2rem;
    }
   
  `],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AppointmentDialogComponent {
  appointmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.appointmentForm = this.fb.group({
      title: [data.appointment ? data.appointment.title : '', Validators.required],
      time: [data.appointment ? data.appointment.time : '', Validators.required]
    });
  }

  onSave(): void {
    if (this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
