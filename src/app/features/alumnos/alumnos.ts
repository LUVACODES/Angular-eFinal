import { Component } from '@angular/core';
import { AlumnosAPI } from './alumnos-api';
import { Student } from '../../../shared/entities';
import { CommonModule, JsonPipe } from '@angular/common';
import { StudentsTable } from "../../students-table/students-table";

@Component({
  selector: 'app-alumnos',
  imports: [CommonModule, JsonPipe, StudentsTable],
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
}
