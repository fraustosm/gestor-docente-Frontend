import { Routes } from '@angular/router';

import { Login }
from './pages/login/login';

import { Groups }
from './pages/groups/groups';

import { Students }
from './pages/students/students';

import { GroupDetails }
from './pages/group-details/group-details';

import { Attendance }
from './pages/attendance/attendance';

import { Grades }
from './pages/grades/grades';

import { Reports}
from './pages/reports/reports';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'groups',
    component: Groups
  },

  {
    path: 'students/:groupId',
    component: Students
  },

  {
    path: 'groups/:id',
    component: GroupDetails
  },

  {
    path: 'attendance/:studentId',
    component: Attendance
  },

  {
    path: 'grades/:studentId',
    component: Grades
  },

  {
    path: 'reports/:studentId',
    component: Reports
  }

];