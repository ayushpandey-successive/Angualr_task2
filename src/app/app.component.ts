import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentService } from './services/student.service';
import { Student } from './models/student';
import { GradePipe } from './pipes/grade.pipe';
import { HighlightDirective } from './directives/highlight.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StudentFormComponent, GradePipe, HighlightDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  students: Student[] = [];
  selectedStudent: Student | null = null;

  constructor(private studentService: StudentService) {
    this.studentService.getStudents().subscribe(students => this.students = students);
  }

  onFormSubmit(student: Student) {
    if (student.id) {
      this.studentService.updateStudent(student);
    } else {
      this.studentService.addStudent(student);
    }
    this.selectedStudent = null;
  }

  editStudent(student: Student) {
    this.selectedStudent = { ...student };
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    if (this.selectedStudent && this.selectedStudent.id === id) {
      this.selectedStudent = null;
    }
  }
}