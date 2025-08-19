import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../shared/entities';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-edit-form',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.scss'
})
export class EditForm implements OnInit, OnChanges {
  @Input() student!: Student;
  @Output() studentEdited = new EventEmitter<Student>();
  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student'] && this.student) {
      if (this.editForm) {
        this.editForm.patchValue(this.student);
      } else {
        this.createForm();
      }
    }
  }

  createForm() {
    this.editForm = this.fb.group({
      dni: [{ value: this.student?.dni, disabled: true }, Validators.required],
      name: [this.student?.name, Validators.required],
      surname: [this.student?.surname, Validators.required],
      age: [this.student?.age, [Validators.required, Validators.min(0)]],
      average: [this.student?.average, [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const formValue = this.editForm.getRawValue(); 
      const updatedStudent: Student = {
        ...formValue,
        id: this.student.id 
      };
      this.studentEdited.emit(updatedStudent);
    }
  }
}