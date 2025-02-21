import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserPointsDisplayComponent } from '../user-points-display/user-points-display.ctrl';
import { GambleTableComponent } from '../gamble-table/gamble-table.component';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
  imports: [UserPointsDisplayComponent, GambleTableComponent],
  standalone: true,
})
export class HomeScreenComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }
  logOut() {
    this.authService.isLogout();
    this.router.navigate(['/login']);
  }
}
