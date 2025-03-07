import { Component, Inject, Injector } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.ctrl.html',
  styleUrls: ['./user-login.ctrl.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class UserLoginComponent {
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
    @Inject(OverlayRef) private overlayRef: OverlayRef
  ) {}

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

      this.overlayRef.dispose();
      // setTimeout(() => {
      //   this.authService.setUsername(username);
      // });
    }
  }
}
