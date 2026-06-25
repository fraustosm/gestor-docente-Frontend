import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl =
    'https://gestor-docente.onrender.com';

  login(data: any) {

    return this.http.post(
      `${this.apiUrl}/auth/login`,
      data
    );

  }

}