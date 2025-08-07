import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../shared/entities';
import { MatTableModule } from '@angular/material/table';
import { FullnamePipe } from '../../shared/pipes/fullname-pipe';
import { Router, RouterModule } from '@angular/router';
import { RoutePaths } from '../../shared/routes';

@Component({
  selector: 'app-students-table',
  imports: [MatTableModule, FullnamePipe, RouterModule],
  templateUrl: './students-table.html',
  styleUrl: './students-table.scss'
})
export class StudentsTable {
  @Input() students: Student[] = [];
  @Output() deleteEvent = new EventEmitter<Student>();
  displayedColumns: string[] = [
    'fullname',
    'age',
    'dni',
    'average',
    'actions'
  ];

  constructor (private router: Router) { }

  viewDetails(student: Student) {
    this.router.navigate([RoutePaths.VIEW_STUDENTS, ], {
      state : { student: student }
    });
  }

  deleteStudent(student: Student) {
    console.log("Eliminando estudiante:", student);
    this.deleteEvent.emit(student)
}
}
