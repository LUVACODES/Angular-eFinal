import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class Cursos implements OnInit, OnDestroy {
  cursos!: Course[];
  displayedColumns: string[] = ['title', 'professor', 'duration', 'price'];
  constructor(private cursosService: CursosAPI) {}

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.cursosService.getCursos()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.cursos = data;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}