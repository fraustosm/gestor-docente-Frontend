import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  login() {

    console.log('Intentando login...');

    this.authService.login({
      email: this.email,
      password: this.password
    })
    .subscribe({

      next: (response: any) => {

        console.log('LOGIN OK', response);

        localStorage.setItem(
          'token',
          response.token
        );

        alert('Login correcto');

        this.router.navigate(
          ['/groups']
        );

      },

      error: (error) => {

        console.error('LOGIN ERROR', error);

        alert('Error de login');

      }

    });

  }

}