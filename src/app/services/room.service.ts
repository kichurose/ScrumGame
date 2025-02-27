import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomInfo } from '../models/RoomInfo';
import { RoomRequest } from '../models/RoomRequest';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'https://scrumgame/api/room'; // C# API URL

  constructor(private http: HttpClient) {}

  createRoom(roomName: string): Observable<RoomInfo> {
    const body: RoomRequest = { roomName };
    return this.http.post<RoomInfo>(this.apiUrl, body);
  }
}
