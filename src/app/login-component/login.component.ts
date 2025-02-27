import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CreateRoomComponent } from '../create-room/create-room.component';

@Component({
  selector: 'login-screen',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  private overlayRef: OverlayRef;

  private _validUsers: Map<string, string> = new Map<string, string>([
    ['shaheen', '1234'],
    ['christina', '1234'],
    ['sherlac', '1234'],
    ['suhail', '1234'],
    ['kriti', '1234'],
  ]);
  public loginForm!: FormGroup;
   constructor(
      private authService: AuthService,
      private router: Router,
      private cdr: ChangeDetectorRef,
      private route: ActivatedRoute,
      private overlay: Overlay,
      private injector: Injector
    ) {
    }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onLogIn() {
    const { username, password } = this.loginForm.value;
    if (username && password && this._validUsers.get(username) === password) {
      this.authService.isLogin();

      this.router.navigate(['/home'], { queryParams: { username: username } });

      // setTimeout(() => {
      //   this.authService.setUsername(username);
      // });
    }
  }

  createRoom(): void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      //backdropClass: 'cdk-overlay-backdrop',
      panelClass: 'custom-overlay-panel',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });

    const injector = Injector.create({
      providers: [{ provide: OverlayRef, useValue: this.overlayRef }],
      parent: this.injector
    });
    
    const portal = new ComponentPortal(CreateRoomComponent, null, injector);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
  }
}
