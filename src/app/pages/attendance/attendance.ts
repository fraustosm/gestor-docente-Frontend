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
  ActivatedRoute
} from '@angular/router';

import {
  AttendanceService
} from '../../services/attendance';

@Component({
  selector: 'app-attendance',
  imports: [
    CommonModule
  ],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance implements OnInit {

  private route =
    inject(ActivatedRoute);

  private attendanceService =
    inject(AttendanceService);

  private cdr =
    inject(ChangeDetectorRef);

  studentId = 0;

  attendance: any[] = [];

  report: any = {
    total: 0,
    presents: 0,
    percentage: 0
  };

  ngOnInit(): void {

    if (typeof window !== 'undefined') {

      this.studentId = Number(
        this.route.snapshot.paramMap.get(
          'studentId'
        )
      );

      this.loadAttendance();

      this.loadReport();

    }

  }

  loadAttendance() {

    this.attendanceService
      .getAttendance(this.studentId)
      .subscribe({

        next: (response: any) => {

          this.attendance = response;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  loadReport() {

    this.attendanceService
      .getReport(this.studentId)
      .subscribe({

        next: (response: any) => {

          this.report = response;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  registerAttendance(
    status: string
  ) {

    this.attendanceService
      .registerAttendance(
        this.studentId,
        status
      )
      .subscribe({

        next: () => {

          this.loadAttendance();

          this.loadReport();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}