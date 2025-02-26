import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from '../shared/utility.service';

@Component({
  selector: 'user-points-display',
  templateUrl: './user-points-display.ctrl.html',
  styleUrls: ['./user-points-display.ctrl.scss'],
  imports: [CommonModule],
})
export class UserPointsDisplayComponent implements OnInit {
  @Input() username: string = '';
  public isFlipped = false;
  public isDeleted = false;
  public users = [
    { name: 'Shaheen', points: 5 },
    { name: 'Christina', points: 8 },
    { name: 'Sherlac', points: 3 },
    { name: 'Kriti', points: 8 },
  ];

  constructor(private utilityService: UtilityService) {}

  ngOnInit(): void {
    console.log(this.username);
    this.utilityService.getStoryPoint().subscribe((storyPoint) => {
      this.users.find((user) => {
        if (user.name.toLowerCase() === this.username.toLowerCase()) {
          user.points = storyPoint;
        }
      });
      console.log('Story Point:', storyPoint);
    });
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  onDeleteEstimates() {
    this.users.forEach((user) => {
      user.points = 0;
    });
    this.isDeleted = true;
    console.log('Delete Estimates');
  }
}
