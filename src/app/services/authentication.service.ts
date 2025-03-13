import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError, Observable, map } from 'rxjs';
import { SignUpRequest } from '../models/SignUpRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'https://scrumgame/api/authenticate';

  constructor(private http: HttpClient) {}

  validateUser(roomId: string) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // return this.http.get(`${this.apiUrl}/${roomId}`, { headers }).pipe(
    //     tap(response =>
    //          console.log('Response:', response)
    //         ),
    //     catchError(error => {
    //       console.error('Error:', error);
    //       return throwError(() => error);
    //     })
    //   )
    //return this.http.get<string>(`${this.apiUrl}/${roomId}`);
    return this.http.get<{ role: string }>(`${this.apiUrl}/${roomId}`, {
      headers,
    });
  }

  signUp(signUpRequest: SignUpRequest): Observable<string> {
    const body = signUpRequest;
    return this.http.post<{ roomId: string, token: string }>(this.apiUrl, body).pipe(
      map((response) => {
        localStorage.setItem('token', response.token);
        //const result = response.roomId;
        return response.roomId;
      })
    );
  }
}
