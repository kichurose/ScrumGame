import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-share-room',
  templateUrl: './share-room.component.html',
  styleUrls: ['./share-room.component.scss'],
})
export class ShareRoomComponent {
  public roomLink: string = '';
  @Input()
  public roomId: string = '';
  constructor() {}

  ngOnInit(): void {
    this.roomLink = `http://localhost:4200/home/${this.roomId}/room`;
  }

  onCopyRoomLink() {
    navigator.clipboard.writeText(this.roomLink);
  }
}
