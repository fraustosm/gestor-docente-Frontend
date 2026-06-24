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
  Router
} from '@angular/router';

import {
  GroupService
} from '../../services/group';

@Component({
  selector: 'app-groups',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './groups.html',
  styleUrl: './groups.css',
})
export class Groups implements OnInit {

  private groupService =
    inject(GroupService);

  private router =
    inject(Router);

  private cdr =
    inject(ChangeDetectorRef);

  groups: any[] = [];

  groupName = '';

  ngOnInit(): void {

    if (typeof window !== 'undefined') {

      setTimeout(() => {

        this.loadGroups();

      }, 100);

    }

  }

  loadGroups() {

    this.groupService
      .getGroups()
      .subscribe({

        next: (response: any) => {

          this.groups = response;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  createGroup() {

    if (!this.groupName.trim()) {
      return;
    }

    this.groupService
      .createGroup(this.groupName)
      .subscribe({

        next: () => {

          this.groupName = '';

          this.loadGroups();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  openStudents(groupId: number) {

    this.router.navigate([
      '/students',
      groupId
    ]);

  }

}