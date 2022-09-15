import { Component, OnInit } from '@angular/core';

const CUP: string = 'cup';

@Component({
  selector: 'app-gamble-table',
  templateUrl: './gamble-table.component.html',
  styleUrls: ['./gamble-table.component.scss'],
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

  toggleSelection(value: any) {
    var state = this.selected.get(value);
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
    if (value == CUP || state) {
      this.isCoffee = true;
      return;
    }
    this.isCoffee = false;
    this.storyPoint = value;
    this.selected.set(CUP, false);
    this.selected.set(value, !state);
  }

  getState(value: any) {
    return this.selected.get(value);
  }
}
