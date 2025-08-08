import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../shared/entities';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core/primitives/di';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-form',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.scss'
})
export class AddForm implements OnInit {
  
  studentForm!: FormGroup;
  @Output() studentAdded = new EventEmitter<Student>();
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar ){}

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
    const formValue = this.studentForm.value;
    const newStudent: Student = {
      ...formValue,
      id: formValue.dni // Set id same as dni
    };
    this.studentAdded.emit(newStudent);
    this.showSuccessAdded();

  }

  showSuccessAdded(){
    const message = 'Estudiante Agregado';
    const action = 'Cerrar';
    this._snackBar.open(message, action, {
      duration: 3000, 
      horizontalPosition: 'left', 
      verticalPosition: 'bottom'      
    })};

  onReset(){
    this.studentForm.reset();
  };
}
