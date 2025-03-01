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
import { CreateRoomComponent } from '../create-room/create-room.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { RoomService } from '../services/room.service';
import { ShareRoomComponent } from '../share-room/share-room.component';

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
  public roomId: string = '';
  private overlayRef: OverlayRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private overlay: Overlay,
    private injector: Injector,
    private roomService: RoomService
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

    this.route.params.subscribe(params => {
      this.roomId = params['roomid']; // Get room ID from the route
      console.log('Room ID in HomeComponent:', this.roomId);
    });
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

  onShareRoom() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      //backdropClass: 'cdk-overlay-backdrop',
      panelClass: 'share-room-overlay-panel',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    // const injector = Injector.create({
    //   providers: [{ provide: OverlayRef, useValue: this.overlayRef }],
    //   parent: this.injector
    // });

    const portal = new ComponentPortal(ShareRoomComponent, null);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }
}
