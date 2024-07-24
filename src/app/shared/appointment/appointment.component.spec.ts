import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDialogComponent } from './appointment.component';

describe('AppointmentDialogComponent', () => {
  let component: AppointmentDialogComponent;
  let fixture: ComponentFixture<AppointmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
