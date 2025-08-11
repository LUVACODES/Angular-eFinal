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
import { Registration } from '../../../shared/registration';

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
      dni: ['', [Validators.required, Validators.minLength(7)]],
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

    this.dataApi.getRegistrations().subscribe((registros: Registration[]) => {
    
      const registroExistente = registros.find(r => r.DNI === dni);

      if (registroExistente) {
        
        if (!Array.isArray(registroExistente.Course)) {
          registroExistente.Course = [];
        }

        if (registroExistente.Course.includes(cursoId)) {
          alert('El alumno ya está inscripto en ese curso');
          return;
        }

        registroExistente.Course.push(cursoId);

        if (registroExistente.id === undefined) {
          alert('Error: registro existente sin id');
          return;
        }

        this.dataApi.updateRegistration(registroExistente.id, registroExistente).subscribe(() => {
          alert(`Alumno ${this.student!.name} inscripto en curso con ID ${cursoId}`);
        });

      } else {
        const nuevoRegistro: Registration = {
          DNI: dni,
          Course: [cursoId]
        };

        this.dataApi.createRegistration(nuevoRegistro).subscribe(() => {
          alert(`Alumno ${this.student!.name} inscripto en curso con ID ${cursoId}`);
        });
      }
    });
  }
}