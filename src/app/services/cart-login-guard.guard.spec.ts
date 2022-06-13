import { TestBed } from '@angular/core/testing';

import { CartLoginGuardGuard } from './cart-login-guard.guard';

describe('CartLoginGuardGuard', () => {
  let guard: CartLoginGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CartLoginGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
