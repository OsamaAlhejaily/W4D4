import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';



export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}
@Injectable({ 
  providedIn: 'root', 
})
export class UserService {
  private cache$?: Observable<User[]>;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    if (!this.cache$) {
      this.cache$ = this.http.get<User[]>('https://api.escuelajs.co/api/v1/users').pipe(
        shareReplay(1) 
      );
    }
    return this.cache$;
  }
}