import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private http = inject(HttpClient);

  private apiUrl =
    'https://gestor-docente.onrender.com/grades';

  private getToken() {

    return typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : '';

  }

  createGrade(
    studentId: number,
    activityName: string,
    grade: number
  ) {

    return this.http.post(
      this.apiUrl,
      {
        studentId,
        activityName,
        grade
      },
      {
        headers: {
          Authorization:
            `Bearer ${this.getToken()}`
        }
      }
    );

  }

  getGrades(
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