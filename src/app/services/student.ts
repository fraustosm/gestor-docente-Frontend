import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
;
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/api/students';

  private getToken() {

    return typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : '';

  }

  getStudents(groupId: number) {

    return this.http.get(
      `${this.apiUrl}/group/${groupId}`,
      {
        headers: {
          Authorization:
            `Bearer ${this.getToken()}`
        }
      }
    );

  }

  createStudent(
    name: string,
    groupId: number
  ) {

    return this.http.post(
      `${this.apiUrl}/group/${groupId}`,
      {
        name
      },
      {
        headers: {
          Authorization:
            `Bearer ${this.getToken()}`
        }
      }
    );

  }

  deleteStudent(studentId: number) {

    return this.http.delete(
      `${this.apiUrl}/${studentId}`,
      {
        headers: {
          Authorization:
            `Bearer ${this.getToken()}`
        }
      }
    );

  }

}