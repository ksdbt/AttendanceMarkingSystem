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
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  form = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    if (this.form.invalid) return;
    this.auth.register(this.form.value).subscribe({
      next: () => { alert('Registered'); this.router.navigate(['/login']); },
      error: err => alert(err.error || 'Registration failed')
    });
  }
}

