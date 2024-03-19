import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GithubApiService } from './github-api.service';
import { githubResults } from './github-api.model';
import { of } from 'rxjs';

describe('GithubApiService', () => {
  let service: GithubApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubApiService],
    });

    service = TestBed.inject(GithubApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return github results from API', fakeAsync(() => {
    const searchTerm = 'jas75/angular-starter';
    const apiUrl = 'https://api.github.com/search/repositories';

    const mockResult: githubResults = {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          description: 'Hello',
          stargazers_count: 1234,
          forks_count: 1234,
          language: 'sdsd',
          updated_at: '',
          html_url: '',
        },
      ],
    };
    service.searchRepositories(searchTerm).subscribe((result) => {
      expect(result).toEqual(mockResult);
    });

    const req = httpMock.expectOne(`${apiUrl}?q=${searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResult);

    tick(); // Simulate the passage of time to complete the observable chain
  }));

  it('should return cached results if available', fakeAsync(() => {
    const searchTerm = 'angular';
    const apiUrl = 'https://api.github.com/search/repositories';
    const mockCachedResult: githubResults = {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          description: 'Hello',
          stargazers_count: 1234,
          forks_count: 1234,
          language: 'sdsd',
          updated_at: '',
          html_url: '',
        },
      ],
    };

    // Add mock result to cache
    service['cache'][searchTerm] = mockCachedResult;

    service.searchRepositories(searchTerm).subscribe((result) => {
      expect(result).toEqual(mockCachedResult);
    });

    // No HTTP request should be made because the result is cached
    httpMock.expectNone(`${apiUrl}?q=${searchTerm}`);

    tick(); // Simulate the passage of time to complete the observable chain
  }));
});
