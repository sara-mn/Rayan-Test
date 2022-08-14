import { TestBed } from '@angular/core/testing';

import { RayanApiService } from './rayan.api.service';

describe('Rayan.ApiService', () => {
  let service: RayanApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RayanApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
