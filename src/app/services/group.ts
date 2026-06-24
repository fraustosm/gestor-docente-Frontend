import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:3000/api/groups';

  getGroups() {

    const token =
      localStorage.getItem('token');

    return this.http.get(
      this.apiUrl,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  }

  createGroup(name: string) {

    const token =
      localStorage.getItem('token');

    return this.http.post(
      this.apiUrl,
      { name },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  }

}