import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { MarkAttendanceComponent } from './attendance/mark-attendance.component';
import { ViewLogsComponent } from './attendance/view-logs.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './core/auth.guard';
import { adminGuard } from './core/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mark', component: MarkAttendanceComponent, canActivate: [authGuard] },
  { path: 'logs', component: ViewLogsComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard, adminGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
];

