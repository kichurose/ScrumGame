import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RoomInfo } from '../models/RoomInfo';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../models/UserRequest';
import { UserInfo } from '../models/UserInfo';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://scrumgame/api/users';

  constructor(private http: HttpClient) {}

  saveUser(userRequest: UserRequest): Observable<any> {
   return this.http.post(this.apiUrl, userRequest);
  }

  getAllUsers(roomId: string): Observable<UserInfo[]> {

    return this.http.get<UserInfo[]>(`${this.apiUrl}/${roomId}`);
  }

}



//preflight request ?
