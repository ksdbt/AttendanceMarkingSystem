import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-mark-attendance',
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './mark-attendance.component.html'
})
export class MarkAttendanceComponent {
  constructor(private api: AuthService) {}

  mark(type: 'IN'|'OUT') {
    this.api.mark(type).subscribe({
      next: (res: any) => alert(`${type} at ${res.timestamp}`),
      error: err => alert(err.error || 'Failed')
    });
  }
}

