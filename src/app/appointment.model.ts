export interface Appointment {
    title: string;
    time: string; 
    date: Date;   
  }


export interface Day {
    date: Date;
    appointments: Appointment[];
  }