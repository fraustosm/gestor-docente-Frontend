import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private authService =
    inject(AuthService);

  email = '';
  password = '';

  login() {

    this.authService.login({
      email: this.email,
      password: this.password
    })
    .subscribe({
      next: (response: any) => {

        localStorage.setItem(
          'token',
          response.token
        );

        alert('Login correcto');

        console.log(response);

      },

      error: (error) => {

        console.error(error);

        alert(JSON.stringify(error));

      }
    });

  }

}