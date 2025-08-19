import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment.prod';
import { Student } from '../../../shared/entities';
import { Course } from '../../../shared/course';
import { Registration } from '../../../shared/registration';
import { ApiEndpoints } from '../../../shared/api-endpoints';

@Injectable({ providedIn: 'root' })
export class DataAPI {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${ApiEndpoints.STUDENTS}/${id}`);
  }

  getStudentByDNI(dni: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/${ApiEndpoints.STUDENTS}?dni=${dni}`);
  }

  getCursos(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/${ApiEndpoints.COURSES}`);
  }

  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.baseUrl}/${ApiEndpoints.REGISTRATIONS}`);
  }

   updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${ApiEndpoints.STUDENTS}/${student.id}`, student);
  }

  createRegistration(data: Registration): Observable<Registration> {
    return this.http.post<Registration>(`${this.baseUrl}/${ApiEndpoints.REGISTRATIONS}`, data);
  }
}