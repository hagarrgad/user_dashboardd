import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  isLoading: boolean = true;
  users: any[] = [];
  totalUsers = 0;
  pageSize = 6;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers(1);
  }

  fetchUsers(page: number) {
    this.isLoading = true;
    this.userService.getUsers(page).subscribe(data => {
      if (data) {
        this.users = data.data;
        this.totalUsers = data.total;
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: any) {
    const pageIndex = event.pageIndex + 1;
    this.fetchUsers(pageIndex);
  }

  goToUserDetails(id: number) {
    this.router.navigate(['/user', id]);
  }
}
