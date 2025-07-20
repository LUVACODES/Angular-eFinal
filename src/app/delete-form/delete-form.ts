import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-delete-form',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './delete-form.html',
  styleUrl: './delete-form.scss'
})
export class DeleteForm implements OnInit {
  
  @Output() studentDeleted = new EventEmitter<string>();
  studentForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      dni: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  };

  deleteStudent(dni: string) {
    this.studentDeleted.emit(dni);
  };

  onDelete() {
  if (this.studentForm.valid) {
    const { dni } = this.studentForm.value;
    this.studentDeleted.emit(dni);
    this.onReset();
  } else {
      this.studentForm.markAllAsTouched();
    }

  };
  onReset(){
    this.studentForm.reset();
  }
}
