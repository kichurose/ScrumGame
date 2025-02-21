import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'login-screen',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [CommonModule, ReactiveFormsModule],
    providers: [AuthService]
})
export class LoginComponent implements OnInit {
  private _validUsers: Map<string, string> = new Map<string, string>([
    ['shaheen', 'Welcome1234'],
    ['christina', 'Welcome1234'],
    ['sherlac', 'Welcome1234'],
    ['suhail', 'Welcome1234'],
    ['kriti', 'Welcome1234'],
  ]);
  public loginForm!: FormGroup;
  constructor(private router: Router,
    private authService: AuthService
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
      this.router.navigate(['/home']);
    }
  }
}
