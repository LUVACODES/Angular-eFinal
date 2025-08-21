import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from './toolbar/toolbar';
import { Navbar } from './navbar/navbar';
import { HttpClient } from '@angular/common/http';
import { Student } from '../shared/entities';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from './ngrx/usuario/entities';
import { Store } from '@ngrx/store';
import { selectUser } from './ngrx/usuario/usuario.selectors';
import { Observable } from 'rxjs';
import { Login } from './features/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Toolbar, Navbar, CommonModule, MatSnackBarModule, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  students: Student[] = [];
  activeSection = "students";
  user$: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private store: Store
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.http.get<Student[]>('mocks/students.json').subscribe(data => {
      this.students = data;
    });
  }


  addStudent(student: Student){
    this.students = [...this.students, student];
  }

  deleteStudent(dni: string) {
    const i = this.students.findIndex(s => s.dni.toString() === dni);
    if (i >= 0) {
      this.students.splice(i, 1);
      this.students = [...this.students];
      this._snackBar.open('Estudiante eliminado', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      });
    } else {
      this._snackBar.open('DNI no encontrado', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom'
      });
    }
  }
}