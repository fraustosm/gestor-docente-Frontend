import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/api/attendance';

  private getToken() {

    return typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : '';

  }

  registerAttendance(
    studentId: number,
    status: string
  ) {

    return this.http.post(
      `${this.apiUrl}/student/${studentId}`,
      { status },
      {
        headers: {
          Authorization:
            `Bearer ${this.getToken()}`
        }
      }
    );

  }

  getAttendance(
    studentId: number
  ) {

    return this.http.get(
      `${this.apiUrl}/student/${studentId}`,
      {
        headers: {
          Authorization:
            `Bearer ${this.getToken()}`
        }
      }
    );

  }

  getReport(
    studentId: number
  ) {

    return this.http.get(
      `${this.apiUrl}/report/${studentId}`,
      {
        headers: {
          Authorization:
            `Bearer ${this.getToken()}`
        }
      }
    );

  }

}