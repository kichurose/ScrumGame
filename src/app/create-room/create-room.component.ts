import { OverlayRef } from '@angular/cdk/overlay';
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
  public roomId: string = '';
  constructor(
    @Inject(OverlayRef) private overlayRef: OverlayRef,
    private router: Router,
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  updateRoomName(value: string) {
    this.authService.isLogin();

    this.roomService.createRoom(value).subscribe((data) => {
      this.roomId = data.roomId;
      this.closeOverlay.emit();
      console.log('Room ID in CreateRoomComponent:', this.roomId);
      this.router.navigate([`/home/${this.roomId}/room`]);
      this.overlayRef.dispose();
      //this.roomService.setRoomId(data.roomId);
    });
  }

  onCancelClick() {
    this.closeOverlay.emit();
    this.overlayRef.dispose();
  }
}
