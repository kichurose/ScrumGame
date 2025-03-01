import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private apiUrl = 'https://scrumgame/api/authenticate';

  constructor(private http: HttpClient) {}

  validateUser(roomId: string) {
    const token = localStorage.getItem('token');

const headers = new HttpHeaders({
  'Authorization': `Bearer ${token}`
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
    return this.http.get<{role: string}>(`${this.apiUrl}/${roomId}`, { headers });
  }
}