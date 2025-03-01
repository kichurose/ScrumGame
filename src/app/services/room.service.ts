import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { RoomRequest } from '../models/RoomRequest';
import { RoomInfo } from '../models/RoomInfo';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'https://scrumgame/api/room'; // C# API URL
  private _roomId$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  createRoom(roomName: string): Observable<RoomInfo> {
    const body: RoomRequest = { roomName };
    return this.http
      .post<{ result: { roomName: string; roomId: string }, jwtToken: string }>(this.apiUrl, body)
      .pipe(
        map((response) => {
          localStorage.setItem('token', response.jwtToken);
          const result = response.result;
          return new RoomInfo(result.roomName, result.roomId);
        })
      );
  }

  getRoomInfoById(roomId: string): Observable<RoomInfo[]> {
    return this.http.get<RoomInfo[]>(`${this.apiUrl}/${roomId}`);
  }

  public setRoomId(value: string) {
    this._roomId$.next(value);
  }

  public get getRoomId(): Observable<string> {
    return this._roomId$.asObservable();
  }
}
