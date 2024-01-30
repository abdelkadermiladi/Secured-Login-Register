import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8090/user';

  constructor(private http: HttpClient) {}

  getUserDetails(username: string, headers: HttpHeaders): Observable<any> {
    return this.http.get(`${this.apiUrl}/${username}`,{ headers });
  }

  getAllUsers(headers: HttpHeaders): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`,{ headers });
  }
  
}
