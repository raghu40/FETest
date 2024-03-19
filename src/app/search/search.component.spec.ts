import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GithubApiService } from '../shared/github-api.service';
import { of, throwError } from 'rxjs';
import { githubResults } from '../shared/github-api.model';
import { SearchResultsComponent } from '../search-results/search-results.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockGithubService: jasmine.SpyObj<GithubApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GithubApiService', ['searchRepositories']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [SearchComponent, SearchResultsComponent],
      providers: [{ provide: GithubApiService, useValue: spy }]
    }).compileComponents();

    mockGithubService = TestBed.inject(GithubApiService) as jasmine.SpyObj<GithubApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
