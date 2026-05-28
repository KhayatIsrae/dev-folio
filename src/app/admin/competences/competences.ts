import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Skill } from '../../core/models/index';

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './competences.html',
  styleUrls: ['./competences.css']
})
export class AdminSkillsComponent implements OnInit, AfterViewInit {

  private data = inject(DataService);
  private fb   = inject(FormBuilder);

  skills: Skill[] = [];
  categories: string[] = [];
  activeCategory = 'Toutes';
  modalOpen = false;
  editMode = false;
  editId: number | null = null;
  deleteTarget: Skill | null = null;
  animated = false;

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
    this.load();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.animated = true, 200);
  }

  load(): void {
    this.skills     = [...this.data.skills];
    this.categories = [...new Set(this.skills.map(s => s.category))];
  }

  openAdd(): void {
    this.editMode = false;
    this.editId   = null;
    this.form.reset({ icon: '⭐', level: 75, category: 'Frontend' });
    this.modalOpen = true;
  }

  openEdit(s: Skill): void {
    this.editMode = true;
    this.editId   = s.id;
    this.form.patchValue(s);
    this.modalOpen = true;
  }

  closeModal(event?: MouseEvent): void {
    if (!event || (event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.modalOpen = false;
    }
  }

  save(): void {
    if (this.form.invalid) return;
    const v = this.form.value as any;
    if (this.editMode && this.editId) {
      this.data.updateSkill(this.editId, v);
    } else {
      this.data.addSkill(v);
    }
    this.modalOpen = false;
    this.load();
  }

  doDelete(): void {
    if (!this.deleteTarget) return;
    this.data.deleteSkill(this.deleteTarget.id);
    this.deleteTarget = null;
    this.load();
  }
}