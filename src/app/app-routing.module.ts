import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GambleTableComponent } from './gamble-table/gamble-table.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { UserPointsDisplayComponent } from './user-points-display/user-points-display.ctrl';
import { LoginComponent } from './login-component/login.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'home', component: HomeScreenComponent, canActivate: [AuthGuardService]},
  {path: 'table', component: GambleTableComponent, canActivate: [AuthGuardService]},
  {path: 'userlist', component: UserPointsDisplayComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
