import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CreateRoomComponent } from '../create-room/create-room.component';
import { UserLoginComponent } from '../user-login/user-login.ctrl';

@Component({
  selector: 'login-screen',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule],
})
export class LoginComponent {
  public roomId: string = '';
  public displayName: string = '';
  private overlayRef: OverlayRef;
  public username: string = '';
  public loginForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private overlay: Overlay,
    private injector: Injector
  ) {}

  joinRoom() {
    // need to update this logic TODO
    this.authService.isLogin();

    //this.authService.joinRoom(this.roomId, this.displayName);
    this.router.navigate(['/home']);
  }
  createRoom(): void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      //backdropClass: 'cdk-overlay-backdrop',
      panelClass: 'custom-overlay-panel',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    const injector = Injector.create({
      providers: [{ provide: OverlayRef, useValue: this.overlayRef }],
      parent: this.injector,
    });

    const portal = new ComponentPortal(CreateRoomComponent, null, injector);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }

  userLogin(): void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      //backdropClass: 'cdk-overlay-backdrop',
      panelClass: 'custom-overlay-panel',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    const injector = Injector.create({
      providers: [{ provide: OverlayRef, useValue: this.overlayRef }],
      parent: this.injector,
    });

    const portal = new ComponentPortal(UserLoginComponent, null, injector);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }
}
