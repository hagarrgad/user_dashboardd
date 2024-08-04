import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule, FormsModule,   MatProgressBarModule
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId !== null) {
        this.fetchUserDetails(+userId);
      } else {
        console.error('User ID is null');
        this.isLoading = false;
      }
    });
  }

  fetchUserDetails(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      data => {
        this.user = data.data;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching user details', error);
        this.isLoading = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
