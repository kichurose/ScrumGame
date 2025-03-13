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
import { UserService } from '../services/user.service';
import { UserRequest } from '../models/UserRequest';
import { AuthenticationService } from '../services/authentication.service';

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
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private overlay: Overlay,
    private injector: Injector
  ) {}

  joinRoom() {
    // need to update this logic TODO
    this.authService.isLogin();

    this.userService
      .saveUser(new UserRequest(this.displayName, this.roomId))
      .subscribe({
        next: (result) => {
          console.log('result', result);
          this.router.navigate([`/home/${this.roomId}/room`]);
        },
        error: (error) => {
          console.log('error', error);
        },
      });
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

  userSignUp(): void {
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
      providers: [{ provide: OverlayRef, useValue: this.overlayRef },
        { provide: 'IS_SIGNUP', useValue: true }
      ],
      parent: this.injector,
    });

    const portal = new ComponentPortal(UserLoginComponent, null, injector);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }

}
