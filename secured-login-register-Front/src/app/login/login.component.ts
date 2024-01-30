import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  username: string = '';
  password: string = '';
  registerUsername: string = '';
  registerPassword: string = '';
  registerGender: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        const jwtToken = response.jwt;
        this.authService.setJwtToken(jwtToken);

        console.log('Login succeeded');

        this.router.navigate(['/home'], { queryParams: { username: this.username } });
      },
      (error) => {
        console.error('Login failed', error);
        window.alert('Login failed. Please check your credentials.');
      }
    );
  }

  register(): void {
    this.authService.register(this.registerUsername, this.registerPassword, this.registerGender).subscribe(
      () => {
        window.alert('Registration successful!');
      },
      (error) => {
        console.error('Registration failed', error);
        window.alert('Registration failed. Please try again.');
      }
    );
  }
}
