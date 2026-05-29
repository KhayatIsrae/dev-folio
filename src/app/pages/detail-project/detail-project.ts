import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService } from '../../admin/services/data.service';
import { Project } from '../../core/models/index';
import { NavBar } from '../../shared/nav-bar/nav-bar';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-detail-project',
  standalone: true,
  imports: [RouterLink, NavBar, Footer],
  templateUrl: './detail-project.html',
  styleUrl: './detail-project.css',
})
export class DetailProject implements OnInit {
  project: Project | undefined;

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.project = this.data.getProjectById(id);
  }

  getBadgeClass(status: string): string {
    return status === 'Publié'
      ? 'badge badge-success'
      : status === 'Brouillon'
      ? 'badge badge-warning'
      : 'badge badge-muted';
  }

  openGithub(): void { console.log('Redirection vers GitHub simulée'); }
  openLive(): void   { console.log('Redirection vers la démo simulée'); }
}