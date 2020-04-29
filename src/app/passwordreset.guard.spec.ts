import { TestBed } from '@angular/core/testing';

import { PasswordresetGuard } from './passwordreset.guard';

describe('PasswordresetGuard', () => {
  let guard: PasswordresetGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PasswordresetGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
