import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { RepositoryDetailsComponent } from '../repository-details/repository-details.component';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent, RepositoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle showDetails property when showDetails method is called', () => {
    const mockResults = [
      { full_name: 'Repo 1', description: 'Description 1', showDetails: false },
      { full_name: 'Repo 2', description: 'Description 2', showDetails: false }
    ];
    component.results = mockResults;
    fixture.detectChanges();

    // Initial state
    expect(component.results[0].showDetails).toBeFalse();
    expect(component.results[1].showDetails).toBeFalse();

    // Call showDetails method for the first repo
    component.showDetails(mockResults[0]);
    fixture.detectChanges();
    expect(component.results[0].showDetails).toBeTrue(); // Show details property should be true for the first repo
    expect(component.results[1].showDetails).toBeFalse(); // Show details property should remain false for the second repo

    // Call showDetails method for the first repo again to toggle it back
    component.showDetails(mockResults[0]);
    fixture.detectChanges();
    expect(component.results[0].showDetails).toBeFalse(); // Show details property should be false for the first repo again
    expect(component.results[1].showDetails).toBeFalse(); // Show details property should remain false for the second repo
  });

  it('should render repository details component when showDetails property is true', () => {
    const mockResults = [
      { full_name: 'Repo 1', description: 'Description 1', showDetails: true },
      { full_name: 'Repo 2', description: 'Description 2', showDetails: false }
    ];
    component.results = mockResults;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('app-repository-details').length).toBe(1); // Only one repository details component should be rendered
  });

  it('should not render repository details component when showDetails property is false', () => {
    const mockResults = [
      { full_name: 'Repo 1', description: 'Description 1', showDetails: false },
      { full_name: 'Repo 2', description: 'Description 2', showDetails: false }
    ];
    component.results = mockResults;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('app-repository-details').length).toBe(0); // No repository details component should be rendered
  });
});
