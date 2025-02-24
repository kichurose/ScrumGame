import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPointsDisplayComponent } from '../user-points-display/user-points-display.ctrl';
import { GambleTableComponent } from '../gamble-table/gamble-table.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserPointsDisplayComponent, GambleTableComponent],
})
export class HomeScreenComponent implements OnInit {
  public username: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}
  private usernameSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.username = this.route.snapshot.queryParams['username'];
    console.log('Username passed from login:', this.username);
    // this.usernameSubscription = this.authService.getUsername.subscribe(username => {
    //   console.log('Username received in HomeComponent:', username);
    //   if (username) {
    //    this.username = username;
    //    this.cdr.detectChanges();
    //   }
    // });
  }

  ngOnDestroy(): void {
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe(); // Unsubscribe to prevent memory leaks
    }
  }
  logOut() {
    this.authService.isLogout();
    this.router.navigate(['/login']);
  }
}
