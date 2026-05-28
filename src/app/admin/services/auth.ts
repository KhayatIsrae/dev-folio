import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {

    if(username === 'admin' && password === '1234') {
      this.isLoggedIn = true;
      localStorage.setItem('admin', 'true');
      return true;
    }

    return false;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('admin');
    this.router.navigate(['/admin/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('admin') === 'true';
  }
}