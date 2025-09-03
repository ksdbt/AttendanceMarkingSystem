import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule, MatTableModule, FormsModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  logs: any[] = [];
  from = '';
  to = '';
  displayedColumns = ['fullName','email','type','timestamp'];

  constructor(private api: AuthService) {}

  ngOnInit() { this.load(); }

  load() {
    const params: any = {};
    if (this.from) params.from = this.from;
    if (this.to) params.to = this.to;
    this.api.allLogs(params).subscribe({ next: (res: any) => this.logs = res });
  }

  exportCSV() {
    if (!this.logs.length) return;
    const headers = Object.keys({ FullName: '', Email: '', Type: '', Timestamp: '' });
    const rows = this.logs.map(l => [l.fullName, l.email, l.type, l.timestamp]);
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'attendance_logs.csv'; a.click();
    URL.revokeObjectURL(url);
  }
}

