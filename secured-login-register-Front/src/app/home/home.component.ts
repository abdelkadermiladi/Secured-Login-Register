import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = '';
  gender: string = '';
  otherUsersNames: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private authService: AuthenticationService,
    private location: Location
  ) {}

  jwtToken = this.authService.getJwtToken();
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.jwtToken}`);

  ngOnInit(): void {
    // Fetch user information from the backend based on the username
    this.username = this.route.snapshot.queryParamMap.get('username') || '';

    this.userService.getUserDetails(this.username, this.headers).subscribe(
      (response) => {
        this.gender = response.gender;
      },
      (error) => {
        console.error('Failed to fetch user details', error);
      }
    );

    this.userService.getAllUsers(this.headers).subscribe(
      (users: any[]) => {
        this.otherUsersNames = users.map((user) => user.username);
        // Filter out the authenticated user's name
        this.otherUsersNames = this.otherUsersNames.filter((username) => username !== this.username);
      },
      (error) => {
        console.error('Failed to fetch other user names', error);
      }
    );
  }

  logout(): void {
    this.authService.clearJwtToken();
    this.router.navigate(['/welcome']);
    this.location.replaceState('/');
  }
}
