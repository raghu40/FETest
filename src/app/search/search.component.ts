import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GithubApiService } from '../shared/github-api.service';
import { githubResults, item } from '../shared/github-api.model';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchInput = new FormControl<string>(''); // Specify type as string
  searchResults: item[] = [];
  isDataLoading: boolean = false;
  errorMessage: string = '';

  constructor(private githubService: GithubApiService) {}

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(
        filter(
          (searchTerm: string | null) =>
            searchTerm !== null && searchTerm.trim().length >= 3
        ),
        tap(() => (this.isDataLoading = true)),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm) => {
          if (searchTerm) {
            this.isDataLoading = false;
            return this.githubService.searchRepositories(searchTerm);
          } else {
            return [];
          }
        })
      )
      .subscribe({
        next: (data: githubResults) => {
          this.searchResults = data.items;
          this.errorMessage = '';
        },
        error: (error) => {
          this.isDataLoading = true;
          this.errorMessage = error;
        },
      });
  }
}
