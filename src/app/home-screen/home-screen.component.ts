import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnInit,
} from '@angular/core';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPointsDisplayComponent } from '../user-points-display/user-points-display.ctrl';
import { GambleTableComponent } from '../gamble-table/gamble-table.component';
import { Subscription } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { ShareRoomComponent } from '../share-room/share-room.component';
import { AuthenticationService } from '../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserPointsDisplayComponent, GambleTableComponent, OverlayModule],
  providers: [Overlay],
})
export class HomeScreenComponent implements OnInit {
  public username: string = '';
  public showDisplayName: boolean = false;
  public isAdmin: boolean = false;
  public displayName: string = '';
  public roomId: string = '';
  private overlayRef: OverlayRef;
  private token: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private overlay: Overlay,
    private injector: Injector,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  private usernameSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.username = this.route.snapshot.queryParams['username'];
    // this.usernameSubscription = this.roomService.getRoomId.subscribe(
    //   (roomId) => {
    //     console.log(' Roomid in HomeComponent:', roomId);
    //     if (roomId) {
    //       this.roomId = roomId;
    //       this.cdr.detectChanges();
    //     }
    //   }
    // );
    this.route.params.subscribe((params) => {
      this.roomId = params['roomid']; // Get room ID from the route
      console.log('Room ID in HomeComponent:', this.roomId);
    });

    this.token = localStorage.getItem('token');
    if (this.token) {
      this.authenticationService
        .validateUser(this.roomId)
        .subscribe((result) => {
          console.log('result', result);
          if (result.role === 'Admin') {
            this.isAdmin = true;
          }
          // if (!this.isAdmin) {
          //   this.showDisplayName = true;
          // }
        });
    }
    // else {
    //   //save the username in the database

    //   this.showDisplayName = true;
    // }

    // if there is no token, then redirect to login page and ask for display name and join the room
  }

  ngOnDestroy(): void {
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
  }

  logOut() {
    this.authService.isLogout();
    this.router.navigate(['/login']);
  }

  onShareRoom() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      panelClass: 'share-room-overlay-panel',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    const injector = Injector.create({
      providers: [{ provide: 'roomId', useValue: this.roomId }],
    });
    const portal = new ComponentPortal(ShareRoomComponent, null, injector);
    this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }
}
