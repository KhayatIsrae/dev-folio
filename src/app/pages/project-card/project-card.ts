import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../core/models/index';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCardComponent {
  @Input() project!: Project;

  getBadgeClass(status: string): string {
    return status === 'Publié'
      ? 'badge badge-success'
      : status === 'Brouillon'
      ? 'badge badge-warning'
      : 'badge badge-muted';
  }
}