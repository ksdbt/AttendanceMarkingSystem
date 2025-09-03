import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-view-logs',
  imports: [CommonModule, MatTableModule, FormsModule],
  templateUrl: './view-logs.component.html'
})
export class ViewLogsComponent implements OnInit {
  logs: any[] = [];
  from = '';
  to = '';
  displayedColumns = ['type','timestamp'];

  constructor(private api: AuthService) {}

  ngOnInit() { this.load(); }

  load() {
    const params: any = {};
    if (this.from) params.from = this.from;
    if (this.to) params.to = this.to;
    this.api.myLogs(params).subscribe({ next: (res: any) => this.logs = res });
  }
}

