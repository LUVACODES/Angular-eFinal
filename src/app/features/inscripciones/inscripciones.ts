import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataAPI } from './data-api';
import { Student } from '../../../shared/entities';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Course } from '../../../shared/course';

@Component({
  selector: 'app-inscripcion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './inscripciones.html'
})
export class Inscripciones {
  form: FormGroup;
  student: Student | null = null;
  cursos: Course[] = [];

  constructor(private fb: FormBuilder, private dataApi: DataAPI) {
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(2)]],
      curso: ['', Validators.required]
    });
  }

  getAlumno() {
    const dniValue = this.form.get('dni')?.value;

    this.dataApi.getStudentByDNI(dniValue).subscribe(students => {
      if (students.length > 0) {
        this.student = students[0];
        this.dataApi.getCursos().subscribe(cursos => {
          this.cursos = cursos;
          this.form.get('curso')?.setValue(null);
          this.form.get('curso')?.markAsUntouched();
          this.form.get('curso')?.updateValueAndValidity();
        });
      } else {
        this.student = null;
        this.cursos = [];
        alert('Alumno no encontrado');
      }
    });
  }

   signUpAlumno() {
  if (this.form.invalid || !this.student) {
    alert('Completa el formulario correctamente');
    return;
  }

  const dni: string = String(this.student?.dni ?? '');
  if (!dni) {
    alert('DNI no válido');
    return;
  }

  const cursoId: number = Number(this.form.value.curso);

  this.dataApi.getStudentById(this.student.id!).subscribe(studentData => {
    
    if (!Array.isArray(studentData.registrations)) {
      studentData.registrations = [];
    }

    if (studentData.registrations.includes(cursoId)) {
      alert('El alumno ya está inscripto en ese curso');
      return;
    }

    studentData.registrations.push(cursoId);

    this.dataApi.updateStudent(studentData).subscribe(() => {
      alert(`Alumno ${studentData.name} inscripto en curso con ID ${cursoId}`);
      this.form.get('curso')?.reset(); 
    });

  });
}
}