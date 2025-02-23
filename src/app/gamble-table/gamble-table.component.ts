import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

const CUP: string = 'cup';

@Component({
    selector: 'app-gamble-table',
    templateUrl: './gamble-table.component.html',
    styleUrls: ['./gamble-table.component.scss'],
    imports: [CommonModule]
})
export class GambleTableComponent {
  public selected = new Map<any, boolean>([
    [1, false],
    [2, false],
    [3, false],
    [5, false],
    [8, false],
    [13, false],
    [21, false],
    [CUP, true],
  ]);
  public storyPoint: number = 0;
  public isCoffee: boolean = true;
  constructor(private authService: AuthService, private router: Router) {}
  

  toggleSelection(value: any) {
    var state = this.selected.get(value);
    this.reset();

    if(state){
      return;
    }
    
    if (value == CUP || state) {
      return;
    }

    this.storyPoint = value;
    this.selected.set(CUP, false);
    this.selected.set(value, true);
  }

  getState(value: any) {
    return this.selected.get(value);
  }

  reset() {
    this.selected = new Map<any, boolean>([
      [1, false],
      [2, false],
      [3, false],
      [5, false],
      [8, false],
      [13, false],
      [21, false],
      [CUP, true],
    ]);
    this.storyPoint = 0;
  }
}
