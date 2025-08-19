import { TestBed } from '@angular/core/testing';

import { DataAPI } from './data-api';

describe('DataApi', () => {
  let service: DataAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
