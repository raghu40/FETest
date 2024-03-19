import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.scss'],
})
export class RepositoryDetailsComponent {
  @Input() repository: any;
}
