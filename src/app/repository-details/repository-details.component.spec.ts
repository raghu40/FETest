import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryDetailsComponent } from './repository-details.component';

describe('RepositoryDetailsComponent', () => {
  let component: RepositoryDetailsComponent;
  let fixture: ComponentFixture<RepositoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display repository details', () => {
    component.repository = {
      full_name: 'Test Repository',
      description: 'This is a test repository',
      stargazers_count: 100,
      forks_count: 50,
      language: 'TypeScript',
      updated_at: '2024-03-19T12:00:00Z',
      html_url: 'https://github.com/test-repo'
    };
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.panel-title').textContent).toContain('Test Repository');
    expect(compiled.querySelector('.panel-body').textContent).toContain('This is a test repository');
    expect(compiled.querySelector('.panel-body').textContent).toContain('Stars: 100');
    expect(compiled.querySelector('.panel-body').textContent).toContain('Forks: 50');
    expect(compiled.querySelector('.panel-body').textContent).toContain('Language: TypeScript');
    expect(compiled.querySelector('.panel-body').textContent).toContain('Updated: Mar 19, 2024');
    expect(compiled.querySelector('.panel-body a').getAttribute('href')).toBe('https://github.com/test-repo');
  });

  it('should not display repository details if repository is null', () => {
    component.repository = null;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.panel')).toBeNull();
  });
});
