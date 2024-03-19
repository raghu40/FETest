import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { githubResults } from './github-api.model';

@Injectable({
  providedIn: 'root',
})
export class GithubApiService {
  private apiUrl = 'https://api.github.com/search/repositories';

  private cache: { [query: string]: githubResults } = {};

  constructor(private http: HttpClient) {}

  searchRepositories(term: string): Observable<githubResults> {
    const cachedResult = this.cache[term];
    if (cachedResult) {
      return of(cachedResult);
    } else {
      return this.http.get<githubResults>(`${this.apiUrl}?q=${term}`).pipe(
        tap((result) => {
          this.cache[term] = result;
          console.log(this.cache);
        }),
        catchError(this.handleError)
      );
    }
  }

  // Handles HTTP errors
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred: ' + error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Backend returned code ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
