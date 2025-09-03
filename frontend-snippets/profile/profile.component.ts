import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  me: any;
  constructor(private api: AuthService) {}
  ngOnInit() { this.api.me().subscribe({ next: (res: any) => this.me = res }); }
}

