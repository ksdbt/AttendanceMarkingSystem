import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) { router.navigate(['/login']); return false; }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload['role'];
    if (role === 'Admin') return true;
  } catch {}
  router.navigate(['/mark']);
  return false;
};

