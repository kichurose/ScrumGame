import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-points-display',
    templateUrl: './user-points-display.ctrl.html',
    styleUrls: ['./user-points-display.ctrl.scss'],
    imports: [
        CommonModule,
    ]
})
export class UserPointsDisplayComponent implements OnInit {
    public isFlipped = false;
    public users = [
        {name: 'Shaheen', points: 5},
        {name: 'Christina', points: 8},
        {name: 'Sherlac', points: 3},
        {name: 'Kriti', points: 8}
    ];

  constructor() { }

  ngOnInit(): void {
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
    
  }

}
