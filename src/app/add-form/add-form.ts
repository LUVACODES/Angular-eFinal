import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../shared/entities';
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-form',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatFormField, MatButtonModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.scss'
})
export class AddForm implements OnInit {
  studentForm!: FormGroup;
  @Output() studentAdded = new EventEmitter<Student>();
  constructor(private fb: FormBuilder ){}

  ngOnInit() {
    this.studentForm = this.fb.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      average: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],

    })
  }

  onSubmit(){
    this.studentAdded.emit(this.studentForm.value);
  }
  onReset(){
    this.studentForm.reset();
  }
}
