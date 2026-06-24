import { Routes } from '@angular/router';

import { Login }
from './pages/login/login';

import { Groups }
from './pages/groups/groups';

import { Students }
from './pages/students/students';

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
  }

];