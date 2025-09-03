import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    if (this.form.invalid) return;
    this.auth.login(this.form.value).subscribe({
      next: res => { localStorage.setItem('token', res.token); this.router.navigate(['/mark']); },
      error: err => alert(err.error || 'Login failed')
    });
  }
}

