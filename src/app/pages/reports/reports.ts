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
  ReportService
} from '../../services/report';

@Component({
  selector: 'app-reports',
  imports: [
    CommonModule
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {

  private route =
    inject(ActivatedRoute);

  private reportService =
    inject(ReportService);

  private cdr =
    inject(ChangeDetectorRef);

  studentId = 0;

  report: any = {
    student: {},
    grades: [],
    attendance: [],
    average: 0,
    attendancePercentage: 0
  };

  ngOnInit(): void {

    if (typeof window !== 'undefined') {

      this.studentId = Number(
        this.route.snapshot.paramMap.get(
          'studentId'
        )
      );

      this.loadReport();

    }

  }

  loadReport() {

    this.reportService
      .getStudentReport(
        this.studentId
      )
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

}