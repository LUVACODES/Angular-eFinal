import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment.prod';
import { Course } from '../../../shared/course';
import { ApiEndpoints } from '../../../shared/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class CursosAPI {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCursos(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/${ApiEndpoints.COURSES}`);
  }
}