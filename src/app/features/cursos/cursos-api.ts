import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from '../../../shared/course';
import { RoutePaths } from '../../../shared/routes';


@Injectable({
  providedIn: 'root'
})


export class CursosAPI {
  baseUrl = environment.localhost;
  constructor(private http: HttpClient) {}

  getCursos(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/${RoutePaths.CURSOS}`).pipe(delay(1000));
  }
}