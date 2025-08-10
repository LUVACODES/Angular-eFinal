import { Component, OnInit } from '@angular/core';
import { CursosAPI } from './cursos-api';
import { CommonModule } from '@angular/common';
import { Course } from '../../../shared/course';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-cursos',
  imports: [CommonModule, MatTableModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss'
})
export class Cursos implements OnInit {
  cursos!: Course[];
  displayedColumns: string[] = ['title', 'professor', 'duration', 'price'];
  constructor(private cursosService: CursosAPI) {}

  ngOnInit() {
    this.cursosService.getCursos().subscribe(data => {
      this.cursos = data; 
    });
  }
}