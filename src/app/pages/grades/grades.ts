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
  ActivatedRoute
} from '@angular/router';

import {
  GradeService
} from '../../services/grade';

@Component({
  selector: 'app-grades',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './grades.html',
  styleUrl: './grades.css',
})
export class Grades implements OnInit {

  private route =
    inject(ActivatedRoute);

  private gradeService =
    inject(GradeService);

  private cdr =
    inject(ChangeDetectorRef);

  studentId = 0;

  activityName = '';

  grade = 0;

  grades: any[] = [];

  report: any = {
    activities: 0,
    average: 0
  };

  ngOnInit(): void {

    if (typeof window !== 'undefined') {

      this.studentId = Number(
        this.route.snapshot.paramMap.get(
          'studentId'
        )
      );

      this.loadGrades();

      this.loadReport();

    }

  }

  loadGrades() {

    this.gradeService
      .getGrades(this.studentId)
      .subscribe({

        next: (response: any) => {

          this.grades = response;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  loadReport() {

    this.gradeService
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

  createGrade() {

    if (
      !this.activityName.trim()
    ) {
      return;
    }

    this.gradeService
      .createGrade(
        this.studentId,
        this.activityName,
        this.grade
      )
      .subscribe({

        next: () => {

          this.activityName = '';

          this.grade = 0;

          this.loadGrades();

          this.loadReport();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}