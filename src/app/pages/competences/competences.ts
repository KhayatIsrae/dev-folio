import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../../admin/services/data.service';
import { Skill } from '../../core/models/index';

@Component({
  selector: 'app-competences',
  standalone: true,
  imports: [],
  templateUrl: './competences.html',
  styleUrl: './competences.css',
})
export class Competences implements OnInit, AfterViewInit {
  skills: Skill[] = [];
  categories: string[] = [];
  animating = false;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.skills = this.data.skills;
    this.categories = [...new Set(this.skills.map(s => s.category))];
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.animating = true, 200);
  }

  byCategory(cat: string): Skill[] {
    return this.skills.filter(s => s.category === cat);
  }

  getDesc(level: number): string {
    if (level >= 90) return 'Expert · Utilisé quotidiennement en production';
    if (level >= 75) return 'Avancé · Maîtrise des patterns complexes';
    if (level >= 60) return 'Intermédiaire · Projets personnels et professionnels';
    return 'Débutant · En cours d\'apprentissage';
  }
}