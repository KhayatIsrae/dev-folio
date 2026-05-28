import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ RouterModule ajouté
import { CommonModule } from '@angular/common';          // ✅ CommonModule ajouté
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,  // ✅ pour *ngIf
    RouterModule   // ✅ pour routerLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  usernameError = '';
  passwordError = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.error = '';
    this.usernameError = '';
    this.passwordError = '';

    let hasError = false;

    if (!this.username.trim()) {
      this.usernameError = "Le nom d'utilisateur est requis";
      hasError = true;
    }

    if (!this.password.trim()) {
      this.passwordError = 'Le mot de passe est requis';
      hasError = true;
    }

    if (hasError) return;

    const success = this.auth.login(this.username, this.password);

    if (success) {
  this.router.navigate(['/admin/overview']); // ✅ au lieu de '/admin'
    } else {
      this.error = "Nom d'utilisateur ou mot de passe incorrect";
    }
  }
}