import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataAPI } from './data-api';
import { Student } from '../../../shared/entities';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Course } from '../../../shared/course';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

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
    MatTableModule,
    AsyncPipe
  ],
  templateUrl: './inscripciones.html'
})
export class Inscripciones {
  form: FormGroup;
  student$: Observable<Student | null> = of(null);
  cursos: Course[] = [];
  busquedaRealizada = false;

  constructor(private fb: FormBuilder, private dataApi: DataAPI) {
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(1)]],
      curso: ['', Validators.required]
    });
  }

  getAlumno() {
    this.busquedaRealizada = true;
    const dniValue = this.form.get('dni')?.value;
    if (this.form.get('dni')?.invalid) {
      this.student$ = of(null);
      this.cursos = [];
      return;
    }
    this.student$ = this.dataApi.getStudentByDNI(dniValue).pipe(
      map(students => students.find(s => String(s.dni) === String(dniValue)) || null),
      tap(student => {
        if (student) {
          this.dataApi.getCursos().subscribe(cursos => {
            this.cursos = cursos;
            this.form.get('curso')?.setValue(null);
            this.form.get('curso')?.markAsUntouched();
            this.form.get('curso')?.updateValueAndValidity();
          });
        } else {
          this.cursos = [];
        }
      }),
      catchError(() => {
        this.cursos = [];
        return of(null);
      })
    );
  }

  signUpAlumno(student: Student | null) {
    const isFormInvalid = this.form.invalid || !student;
    const dni = String(student?.dni ?? '');
    const cursoId = Number(this.form.value.curso);

    
    isFormInvalid ? alert('Completa el formulario correctamente') :
    !dni ? alert('DNI no válido') :
    this.dataApi.getStudentById(student!.id!).subscribe(studentData => {
      const registrations = Array.isArray(studentData.registrations) ? studentData.registrations : (studentData.registrations = []);
      registrations.includes(cursoId)
        ? alert('El alumno ya está inscripto en ese curso')
        : this.dataApi.updateStudent({ ...studentData, registrations: [...registrations, cursoId] })
            .subscribe(() => {
              alert(`Alumno ${studentData.name} inscripto en curso con ID ${cursoId}`);
              this.form.get('curso')?.reset();
            });
    });
  }
}