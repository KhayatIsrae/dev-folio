import { Component, OnInit, OnDestroy, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';
import { Skill } from '../../core/models/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './competences.html',
  styleUrls: ['./competences.css']
})
export class AdminSkillsComponent implements OnInit, OnDestroy, AfterViewInit {

  private data  = inject(DataService);
  private fb    = inject(FormBuilder);
  private toast = inject(ToastService);

  private sub!: Subscription;

  skills:        Skill[]  = [];
  categories:    string[] = [];
  activeCategory = 'Toutes';
  modalOpen      = false;
  editMode       = false;
  editId:        number | null = null;
  deleteTarget:  Skill | null  = null;
  animated       = false;

  form = this.fb.group({
    name:     ['', Validators.required],
    icon:     ['⭐'],
    level:    [75],
    category: ['Frontend'],
  });

  get filteredSkills(): Skill[] {
    return this.activeCategory === 'Toutes'
      ? this.skills
      : this.skills.filter(s => s.category === this.activeCategory);
  }

  ngOnInit(): void {
    this.sub = this.data.skills$.subscribe(() => this.load());
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.animated = true, 200);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  load(): void {
    this.skills     = [...this.data.skills];
    this.categories = [...new Set(this.skills.map(s => s.category))];
  }

  openAdd(): void {
    this.editMode  = false;
    this.editId    = null;
    this.form.reset({ icon: '⭐', level: 75, category: 'Frontend' });
    this.modalOpen = true;
  }

  openEdit(s: Skill): void {
    this.editMode  = true;
    this.editId    = s.id;
    this.form.patchValue({ ...s });
    this.modalOpen = true;
  }

  closeModal(event?: MouseEvent): void {
    if (!event || (event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.modalOpen = false;
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.toast.error('Le nom de la compétence est obligatoire');
      return;
    }
    const v = this.form.value as any;
    try {
      if (this.editMode && this.editId) {
        this.data.updateSkill(this.editId, v);
        this.toast.success('Compétence mise à jour ✓');
      } else {
        this.data.addSkill(v);
        this.toast.success('Compétence ajoutée ✓');
      }
      this.modalOpen = false;
    } catch {
      this.toast.error('Erreur lors de l\'enregistrement');
    }
  }

  doDelete(): void {
    if (!this.deleteTarget) return;
    try {
      this.data.deleteSkill(this.deleteTarget.id);
      this.toast.success('Compétence supprimée ✓');
      this.deleteTarget = null;
    } catch {
      this.toast.error('Erreur lors de la suppression');
    }
  }
}