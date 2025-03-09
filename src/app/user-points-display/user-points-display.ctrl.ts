import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UtilityService } from '../shared/utility.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-points-display',
  templateUrl: './user-points-display.ctrl.html',
  styleUrls: ['./user-points-display.ctrl.scss'],
  imports: [CommonModule],
})
export class UserPointsDisplayComponent implements OnInit {
  @Input() username: string = '';
  @Input() roomId: string = '';
  public isFlipped = false;
  public isDeleted = false;
  public users = [
    // { name: 'Shaheen', points: 5 },
    // { name: 'Christina', points: 8 },
    // { name: 'Sherlac', points: 3 },
    // { name: 'Kriti', points: 8 },
  ];

  constructor(private utilityService: UtilityService, private userService: UserService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.userService.getAllUsers(this.roomId).subscribe((users) => {
      this.users = users;
      this.cdr.detectChanges();
      console.log('users', users);

    });
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
