import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GambleTableComponent } from './gamble-table/gamble-table.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: HomeScreenComponent},
  {path: 'table', component: GambleTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
