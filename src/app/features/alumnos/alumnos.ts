import { Component } from '@angular/core';
import { AlumnosAPI } from './alumnos-api';
import { Student } from '../../../shared/entities';
import { CommonModule } from '@angular/common';
import { StudentsTable } from "../../students-table/students-table";
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-alumnos',
  imports: [CommonModule, StudentsTable],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss'
})
export class Alumnos {
  alumnos!: Student[];
  constructor(private alumnosAPI: AlumnosAPI) {}

  ngOnInit() {
    this.alumnosAPI.getAlumnos().subscribe(alumnos => {
      this.alumnos = alumnos;
    });
  }

  deleteStudent( student: Student) {
    this.alumnosAPI.deleteAlumno(student).pipe(
      switchMap(() => this.alumnosAPI.getAlumnos())
    ).subscribe(alumnos => {
      this.alumnos = alumnos
    });
    
  }
}
