import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';
import { Project } from '../../core/models/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projets.html',
  styleUrls: ['./projets.css']
})
export class AdminProjectsComponent implements OnInit, OnDestroy {

  filtered: Project[] = [];
  query    = '';
  sortKey  = '';

  showForm  = false;
  editingId: number | null = null;
  deleteTarget: Project | null = null;

  form: Omit<Project, 'id'> = this.emptyForm();

  readonly statusOptions = ['Publié', 'Brouillon', 'Privé'];
  readonly typeOptions   = ['Application Web', 'E-commerce', 'Éducation', 'Finance', 'Santé', 'Design', 'Media'];
  readonly colorOptions  = ['#3b82f6','#059669','#0891b2','#d97706','#7c3aed','#dc2626','#0f766e','#1d4ed8'];

  private sub!: Subscription;

  constructor(
    public data:  DataService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.sub = this.data.projects$.subscribe(() => this.apply());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private emptyForm(): Omit<Project, 'id'> {
    return {
      name: '', initial: '', color: '#3b82f6',
      techs: [], description: '', longDescription: '',
      github: '', liveUrl: '', status: 'Publié',
      date: new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric' }),
      year: String(new Date().getFullYear()),
      type: 'Application Web', featured: false
    };
  }

  apply(): void {
    let r = [...this.data.projects];
    if (this.query.trim()) {
      const q = this.query.toLowerCase();
      r = r.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.techs.some(t => t.toLowerCase().includes(q)) ||
        p.status.toLowerCase().includes(q)
      );
    }
    if (this.sortKey === 'name')   r.sort((a,b) => a.name.localeCompare(b.name));
    if (this.sortKey === 'status') r.sort((a,b) => a.status.localeCompare(b.status));
    if (this.sortKey === 'year')   r.sort((a,b) => b.year.localeCompare(a.year));
    this.filtered = r;
  }

  openAdd(): void {
    this.form      = this.emptyForm();
    this.editingId = null;
    this.showForm  = true;
  }

  openEdit(p: Project): void {
    this.form = { ...p, techs: [...p.techs] };
    this.editingId = p.id;
    this.showForm  = true;
  }

  save(): void {
    if (!this.form.name.trim()) {
      this.toast.error('Le nom du projet est obligatoire');
      return;
    }
    try {
      if (!this.form.initial.trim())
        this.form.initial = this.form.name.charAt(0).toUpperCase();
      if (this.editingId !== null) {
        this.data.updateProject(this.editingId, this.form);
        this.toast.success('Projet mis à jour ✓');
      } else {
        this.data.addProject(this.form);
        this.toast.success('Projet ajouté ✓');
      }
      this.showForm = false;
      this.apply();
    } catch {
      this.toast.error('Erreur lors de l\'enregistrement du projet');
    }
  }

  confirmDelete(p: Project): void { this.deleteTarget = p; }

  doDelete(): void {
    if (!this.deleteTarget) return;
    try {
      this.data.deleteProject(this.deleteTarget.id);
      this.toast.success('Projet supprimé ✓');
      this.deleteTarget = null;
      this.apply();
    } catch {
      this.toast.error('Erreur lors de la suppression');
    }
  }

  cancel(): void { this.showForm = false; }

  get techsString(): string          { return (this.form.techs ?? []).join(', '); }
  set techsString(v: string)         { this.form.techs = v.split(',').map(t => t.trim()).filter(Boolean); }

  get publishedCount(): number { return this.data.projects.filter(p => p.status === 'Publié').length; }
  get draftCount():     number { return this.data.projects.filter(p => p.status === 'Brouillon').length; }
  get featuredCount():  number { return this.data.projects.filter(p => p.featured).length; }
}