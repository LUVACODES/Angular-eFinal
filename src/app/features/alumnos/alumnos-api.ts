import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Student } from '../../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment.prod';
import { ApiEndpoints } from '../../../shared/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AlumnosAPI {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/${ApiEndpoints.STUDENTS}`).pipe(delay(500));
  }

  deleteAlumno(student: Student): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${ApiEndpoints.STUDENTS}/${student.id}`).pipe(delay(500));
  }

  addAlumno(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/${ApiEndpoints.STUDENTS}`, student).pipe(delay(500));
  }

  updateAlumno(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${ApiEndpoints.STUDENTS}/${student.id}`, student);
  }
}