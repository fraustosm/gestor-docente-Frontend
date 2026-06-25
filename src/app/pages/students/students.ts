import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  StudentService
} from '../../services/student';

import { GroupService } from '../../services/group';

import {
  AttendanceService
} from '../../services/attendance';

@Component({
  selector: 'app-students',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {

  private route =
    inject(ActivatedRoute);

  private studentService =
    inject(StudentService);

  private groupService =
    inject(GroupService);

  private attendanceService =
    inject(AttendanceService);

  private cdr =
    inject(ChangeDetectorRef);

  groupId = 0;

  studentName = '';

  students: any[] = [];
  group: any = {};

  ngOnInit(): void {

    if (typeof window !== 'undefined') {

      this.groupId = Number(
        this.route.snapshot.paramMap.get(
          'groupId'
        )
      );

      this.loadStudents();
      this.groupService.getGroup(this.groupId).subscribe({
        next: (response: any) => {
          this.group = response;
        },
        error: (error) => {
          console.error(error);
        }
      });

    }

  }

  loadStudents() {

    this.studentService
      .getStudents(this.groupId)
      .subscribe({

        next: (response: any) => {

          this.students = response;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  createStudent() {

    if (!this.studentName.trim()) {
      return;
    }

    this.studentService
      .createStudent(
        this.studentName,
        this.groupId
      )
      .subscribe({

        next: () => {

          this.studentName = '';

          this.loadStudents();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  registerAttendance(
    studentId: number,
    status: string
  ) {

    this.attendanceService
      .registerAttendance(
        studentId,
        status
      )
      .subscribe({

        next: () => {

          alert(
            `Asistencia registrada: ${status}`
          );

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  deleteStudent(id: number) {

    this.studentService
      .deleteStudent(id)
      .subscribe({

        next: () => {

          this.loadStudents();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}