import { Component } from '@angular/core';
import { AlumnosAPI } from './alumnos-api';
import { Student } from '../../../shared/entities';
import { CommonModule } from '@angular/common';
import { StudentsTable } from "../../students-table/students-table";
import { switchMap } from 'rxjs';
import { AddForm } from "../../add-form/add-form";
import { EditForm } from '../../edit-form/edit-form';

@Component({
  selector: 'app-alumnos',
  imports: [CommonModule, StudentsTable, AddForm, EditForm],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss'
})
export class Alumnos {
  activeView: 'list' | 'add' | 'edit' = 'list';
  alumnos!: Student[];
  editStudentData?: Student;
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

  addStudent( student: Student ) {
  this.alumnosAPI.addAlumno(student).pipe(
    switchMap(() => this.alumnosAPI.getAlumnos())
  ).subscribe(alumnos => {
    this.alumnos = alumnos;
    this.activeView = 'list'; 
  });
  }

  onEditStudent(student: Student) {
    this.editStudentData = student;
    this.activeView = 'edit';
  }

  updateStudent(student: Student) {
  this.alumnosAPI.updateAlumno(student).pipe(
    switchMap(() => this.alumnosAPI.getAlumnos())
  ).subscribe(alumnos => {
    this.alumnos = alumnos;
    this.activeView = 'list';
    this.editStudentData = undefined;
  });
  }
}
