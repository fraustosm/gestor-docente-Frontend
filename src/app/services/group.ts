import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private http = inject(HttpClient);

  private apiUrl =
    'https://gestor-docente.onrender.com/groups';

  private getToken() {

    return typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : '';

  }

  getGroups() {

    return this.http.get(
      this.apiUrl,
      {
        headers: {
          Authorization:
            `Bearer ${this.getToken()}`
        }
      }
    );

  }

  getGroup(id: number) {

    return this.http.get(
      `${this.apiUrl}/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${this.getToken()}`
        }
      }
    );

  }

  createGroup(name: string) {

    return this.http.post(
      this.apiUrl,
      { name },
      {
        headers: {
          Authorization:
            `Bearer ${this.getToken()}`
        }
      }
    );

  }

  updateGroup(
    id: number,
    name: string
  ) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      { name },
      {
        headers: {
          Authorization:
            `Bearer ${this.getToken()}`
        }
      }
    );

  }

  deleteGroup(id: number) {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${this.getToken()}`
        }
      }
    );

  }

}