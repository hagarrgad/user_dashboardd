import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    const cacheKey = `usersPage-${page}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    } else {
      return this.http.get(`https://reqres.in/api/users?page=${page}`).pipe(
        map(response => {
          this.cache.set(cacheKey, response);
          return response;
        }),
        catchError(error => {
          console.error(error);
          return of(null);
        })
      );
    }
  }

  getUserById(id: number): Observable<any> {
    const cacheKey = `user-${id}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    } else {
      return this.http.get(`https://reqres.in/api/users/${id}`).pipe(
        map(response => {
          this.cache.set(cacheKey, response);
          return response;
        }),
        catchError(error => {
          console.error(error);
          return of(null);
        })
      );
    }
  }
}
