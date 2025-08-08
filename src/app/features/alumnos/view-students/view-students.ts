import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../../../shared/entities';
import { JsonPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FullnamePipe } from '../../../../shared/pipes/fullname-pipe';

@Component({
  selector: 'app-view-students',
  imports: [MatTableModule, MatCardModule, FullnamePipe],
  templateUrl: './view-students.html',
  styleUrl: './view-students.scss'
})
export class ViewStudents {
    displayedColumns: string[] = [
    'fullname',
    'age',
    'dni',
    'average',
   ];
    student: Student | undefined;

    constructor(private router: Router) {
      const navigation = this.router.getCurrentNavigation();
      this.student = navigation?.extras.state?.["student"];
    }
}
