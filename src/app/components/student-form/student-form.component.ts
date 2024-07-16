import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnChanges {
  @Input() student: Student | null = null;
  @Output() formSubmit = new EventEmitter<Student>();

  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      grade: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student'] && this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData: Student = this.studentForm.value;
      if (this.student) {
        studentData.id = this.student.id;
      }
      this.formSubmit.emit(studentData);
      this.studentForm.reset();
    }
  }
}