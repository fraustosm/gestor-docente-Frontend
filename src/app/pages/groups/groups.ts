import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GroupService }
from '../../services/group';

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

  groups: any[] = [];

  groupName = '';


ngOnInit(): void {

  if (typeof window !== 'undefined') {

    this.loadGroups();

  }

}

  loadGroups() {

    this.groupService
      .getGroups()
      .subscribe({
        next: (response: any) => {

          this.groups = response;

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

}