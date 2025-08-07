import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Student } from '../../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroment';
import { RoutePaths } from '../../../shared/routes';

@Injectable({
  providedIn: 'root'
})
export class AlumnosAPI {
  baseUrl = environment.localhost;
  constructor(
    private http: HttpClient
  ){}
  getAlumnos (): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/${RoutePaths.STUDENTS}`).pipe(delay(1000));
  }
  
  deleteAlumno(student: Student): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${RoutePaths.STUDENTS}/${student.dni}`).pipe(delay(1000));
  }
}