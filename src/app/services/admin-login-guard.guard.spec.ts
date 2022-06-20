import { TestBed } from '@angular/core/testing';

import { AdminLoginGuardGuard } from './admin-login-guard.guard';

describe('AdminLoginGuardGuard', () => {
  let guard: AdminLoginGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminLoginGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
