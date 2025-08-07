import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../../../shared/entities';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-view-students',
  imports: [JsonPipe],
  templateUrl: './view-students.html',
  styleUrl: './view-students.scss'
})
export class ViewStudents {

    student: Student | undefined;

    constructor(private router: Router) {
      const navigation = this.router.getCurrentNavigation();
      this.student = navigation?.extras.state?.["student"];
    }
}
