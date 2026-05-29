import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../admin/services/data.service';
import { Project } from '../../core/models/index';
import { NavBar } from '../../shared/nav-bar/nav-bar';
import { Footer } from '../../shared/footer/footer';
import { ProjectCardComponent } from '../project-card/project-card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-liste-projet',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBar, Footer, ProjectCardComponent],
  templateUrl: './liste-projet.html',
  styleUrl: './liste-projet.css'
})
export class ListeProjet implements OnInit, OnDestroy {
  all: Project[] = [];
  filtered: Project[] = [];
  techs = ['Tous', 'Angular', 'React', 'Node.js', 'TypeScript'];
  activeTech = 'Tous';
  query = '';

  private sub!: Subscription; // 👈 garder la référence pour unsubscribe

  constructor(private data: DataService) {}

  ngOnInit(): void {
    // 👇 S'abonner à l'Observable au lieu de lire getValue() une seule fois
    this.sub = this.data.projects$.subscribe(projects => {
      this.all = projects.filter(p => p.status === 'Publié');
      this.applyFilters(); // recalculer filtered à chaque changement
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe(); // 👈 éviter les memory leaks
  }

  setTech(tech: string): void {
    this.activeTech = tech;
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.all];
    if (this.activeTech !== 'Tous') {
      result = result.filter(p =>
        p.techs.some(t => t.toLowerCase().includes(this.activeTech.toLowerCase()))
      );
    }
    if (this.query.trim()) {
      const q = this.query.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techs.join(' ').toLowerCase().includes(q)
      );
    }
    this.filtered = result;
  }
}