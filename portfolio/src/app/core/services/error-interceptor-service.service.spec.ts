import { TestBed } from '@angular/core/testing';

import { ErrorInterceptorServiceService } from './error-interceptor-service.service';

describe('ErrorInterceptorServiceService', () => {
  let service: ErrorInterceptorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorInterceptorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
