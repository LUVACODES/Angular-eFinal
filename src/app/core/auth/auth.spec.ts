import { TestBed } from '@angular/core/testing';

import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia iniciar sesion con credenciales validas', () => {
    const username = 'admin';
    const password = 'admin123';
    const response = service.login(username, password);
    expect(response).toBeTruthy();

    
  });
  it('deberia fallar el login con credenciales invalidas', () => {
    const username = 'estoesunaprueba@nofunciona.PepeArgento';
    const password = 'Moni. 111';
    const response = service.login(username, password);
    expect(response).toBeNull();
  });

  it('deberia cerrar sesion exitosamente', () => {
    const response = service.logout();
    expect(response).toBeUndefined();
  });

});
