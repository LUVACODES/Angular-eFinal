import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-delete-form',
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './delete-form.html',
  styleUrl: './delete-form.scss'
})
export class DeleteForm implements OnInit {
  private _snackBar = inject(MatSnackBar);
  
  @Output() studentDeleted = new EventEmitter<string>();
  studentForm!: FormGroup;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      dni: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }
  deleteStudent(dni: string) {
    this.studentDeleted.emit(dni);
  }

   onDelete() {
   
    console.log('Form submitted:', this.studentForm.valid);
    if (this.studentForm.valid) {
      this.showSuccessDelete();
      const { dni } = this.studentForm.value;
      console.log("dni", dni)
      this.studentDeleted.emit(dni);
    }
  }

  showSuccessDelete(){
      const message = 'Estudiante eliminado';
    const action = 'Cerrar';
    this._snackBar.open(message, action);
  }
}
