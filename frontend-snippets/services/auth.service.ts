import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://localhost:7143/api'; // Change to your backend URL

  constructor(private http: HttpClient) {}

  register(data: any) { return this.http.post(`${this.baseUrl}/auth/register`, data); }
  login(data: any) { return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, data); }
  mark(type: 'IN'|'OUT') { return this.http.post(`${this.baseUrl}/attendance/mark`, { type }); }
  myLogs(params?: any) { return this.http.get(`${this.baseUrl}/attendance/mine`, { params }); }
  allLogs(params?: any) { return this.http.get(`${this.baseUrl}/attendance/all`, { params }); }
  me() { return this.http.get(`${this.baseUrl}/users/me`); }
}

