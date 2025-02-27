import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
  imports: [],
})
export class CreateRoomComponent {
  @Output() closeOverlay = new EventEmitter<void>();
  roomName = '';
  constructor(
    @Inject(OverlayRef) private overlayRef: OverlayRef,
    private router: Router,
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  updateRoomName(value: string) {
    //console.log(value);
    this.authService.isLogin();
    this.roomName = value;
    this.roomService.createRoom(value).subscribe((data) => {
      let abc = data;
      console.log('ARoom  Info ', abc);
    });

    this.closeOverlay.emit();
    this.router.navigate(['./home']);
    this.overlayRef.dispose();
  }

  onCancelClick() {
    this.closeOverlay.emit();
    this.overlayRef.dispose();
  }
}
