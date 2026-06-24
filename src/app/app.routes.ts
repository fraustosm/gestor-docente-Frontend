import { Routes } from '@angular/router';

import { Login }
from './pages/login/login';

import { Groups }
from './pages/groups/groups';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'groups',
    component: Groups
  }

];