import { Component } from '@angular/core';

@Component({
  selector: 'app-share-room',
  templateUrl: './share-room.component.html',
  styleUrls: ['./share-room.component.scss'],
})
export class ShareRoomComponent {
  public roomLink: string = '';
  constructor() {}

  ngOnInit(): void {
    this.roomLink = 'https://scrumgame/room/1234';
  }

  onCopyRoomLink() {
    navigator.clipboard.writeText(this.roomLink);
  }
}
