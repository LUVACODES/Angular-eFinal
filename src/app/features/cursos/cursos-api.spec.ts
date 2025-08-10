import { TestBed } from '@angular/core/testing';

import { CursosAPI } from './cursos-api';

describe('CursosApi', () => {
  let service: CursosAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
