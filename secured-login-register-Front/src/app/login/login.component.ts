import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <label for="username">Username:</label>
      <input id="username" type="text" [(ngModel)]="username" />
      <br />
      <label for="password">Password:</label>
      <input id="password" type="password" [(ngModel)]="password" />
      <br />
      <button (click)="login()">Login</button>
      <br>
      <button (click)="getAuthenticatedUser()">Get Authenticated User</button>
      <br />-----------------------------
      <br>
      <label for="registerUsername">Register Username:</label>
      <input id="registerUsername" type="text" [(ngModel)]="registerUsername" />
      <br />
      <label for="registerPassword">Register Password:</label>
      <input id="registerPassword" type="password" [(ngModel)]="registerPassword" />
      <br />
      <button (click)="register()">Register</button>
    </div>
  `,
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  registerUsername: string = '';
  registerPassword: string = '';
  userDetails: any;

  constructor(private authService: AuthenticationService) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        const jwtToken = response.jwt;
        this.authService.setJwtToken(jwtToken);

        const userDetails = response.user;

        if (userDetails && userDetails.authorities) {
          const roles = userDetails.authorities.map((authority: { authority: any; }) => authority.authority).join(', ');
          window.alert(`Hello, ${userDetails.username}! Roles: ${roles}`);
        } else {
          window.alert('Login successful, but user details are incomplete.');
        }
      },
      (error) => {
        console.error('Login failed', error);
        window.alert('Login failed. Please check your credentials.');
      }
    );
  }

  register(): void {
    this.authService.register(this.registerUsername, this.registerPassword).subscribe(
      (response) => {
        window.alert('Registration successful!');
      },
      (error) => {
        console.error('Registration failed', error);
        window.alert('Registration failed. Please try again.');
      }
    );
  }

  getAuthenticatedUser(): void {
    const jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);
      this.authService
        .getAuthenticatedUser(headers)
        .subscribe(
          (response) => {
            console.log('getAuthenticatedUser response', response);
            this.userDetails = response;
          },
          (error) => {
            console.error('Error getAuthenticatedUser', error);
            window.alert('Error fetching user details.');
          }
        );
    } else {
      console.error('JWT token not available. User not logged in.');
      window.alert('User not logged in.');
    }
  }
}
