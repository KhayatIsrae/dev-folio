import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ProjectService } from '../../project';
import { project } from '../../project.interface';


@Component({
  selector: 'app-accueil',
  imports: [RouterLink],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil implements OnInit {
  projects: project[] = [];
  public constructor(private projectService: ProjectService) { }
  ngOnInit(): void {
    this.projects = this.projectService.getPublicProjects();
  }
}
