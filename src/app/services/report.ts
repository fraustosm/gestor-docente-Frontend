import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/api/reports';

  private getToken() {

    return typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : '';

  }

  getStudentReport(
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

}