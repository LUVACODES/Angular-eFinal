import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment';
import { Student } from '../../../shared/entities';
import { Course } from '../../../shared/course';
import { RoutePaths } from '../../../shared/routes';
import { Registration } from '../../../shared/registration';

@Injectable({ providedIn: 'root' })
export class DataAPI {
  private baseUrl = environment.localhost;

  constructor(private http: HttpClient) {}

  getStudentByDNI(dni: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/${RoutePaths.STUDENTS}?dni=${dni}`);
  }

  getCursos(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/${RoutePaths.CURSOS}`);
  }


  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.baseUrl}/${RoutePaths.REGISTRATION}`);
  }

  updateRegistration(id: number, data: Registration): Observable<Registration> {
    return this.http.put<Registration>(`${this.baseUrl}/${RoutePaths.REGISTRATION}/${id}`, data);
  }

  createRegistration(data: Registration): Observable<Registration> {
    return this.http.post<Registration>(`${this.baseUrl}/${RoutePaths.REGISTRATION}`, data);
  }
}