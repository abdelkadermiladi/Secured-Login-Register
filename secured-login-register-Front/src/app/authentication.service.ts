// authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private jwtToken: string | null = null;
  private apiUrl = "http://localhost:8090";
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials, { headers });
  }

  register(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/auth/register`, credentials, { headers });
  }

  setJwtToken(token: string): void {
    this.jwtToken = token;
    localStorage.setItem('jwtToken', token);
  }

  getJwtToken(): string | null {
    // Retrieve the token from storage
    return this.jwtToken || localStorage.getItem('jwtToken');
  }

  clearJwtToken(): void {
    // Clear the token from storage
    this.jwtToken = null;
    localStorage.removeItem('jwtToken');
  }

  getAuthenticatedUser(headers: HttpHeaders): Observable<any> {
    // Make a request to your secure endpoint using the stored JWT token
    return this.http.get<any>(`${this.apiUrl}/auth/AuthenticatedUser`, { headers });
  }
}
