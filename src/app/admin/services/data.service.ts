import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project, Skill } from '../../core/models/index';

const PROJECTS_KEY = 'portfolio_projects';
const SKILLS_KEY   = 'portfolio_skills';

const DEFAULT_PROJECTS: Project[] = [
  { id: 1, name: 'TaskFlow', initial: 'T', color: '#3b82f6', techs: ['Angular', 'RxJS', 'TypeScript'], description: 'Application de gestion de tâches avec Kanban, drag & drop, et synchronisation temps réel via RxJS.', longDescription: "TaskFlow est une application de gestion de tâches avancée construite avec Angular 17 et RxJS.", github: 'https://github.com/sana-alaoui/taskflow', liveUrl: 'https://taskflow.sana.dev', status: 'Publié', date: '15 mars 2026', year: '2026', type: 'Application Web', featured: true },
  { id: 2, name: 'ShopNow', initial: 'S', color: '#059669', techs: ['Angular', 'Node.js', 'MongoDB'], description: 'Plateforme e-commerce complète avec panier, paiement simulé et dashboard vendeur.', longDescription: "ShopNow est une plateforme e-commerce full-stack.", github: 'https://github.com/sana-alaoui/shopnow', status: 'Publié', date: '02 févr. 2026', year: '2026', type: 'E-commerce', featured: true },
  { id: 3, name: 'MétéoCity', initial: 'M', color: '#0891b2', techs: ['Angular', 'REST API', 'OpenWeather'], description: "Application météo avec géolocalisation, prévisions 7 jours et alertes personnalisées.", longDescription: "MétéoCity utilise l'API OpenWeather.", github: 'https://github.com/sana-alaoui/meteocity', status: 'Publié', date: '20 janv. 2026', year: '2026', type: 'Application Web', featured: true },
  { id: 4, name: 'EduQuiz', initial: 'Q', color: '#d97706', techs: ['Angular', 'NgRx', 'Firebase'], description: 'Plateforme de quiz éducatifs avec gestion NgRx, scoring et classements.', longDescription: "EduQuiz utilise NgRx pour la gestion d'état complexe.", github: 'https://github.com/sana-alaoui/eduquiz', status: 'Brouillon', date: '10 avr. 2026', year: '2026', type: 'Éducation' },
  { id: 5, name: 'CryptoTrack', initial: 'B', color: '#7c3aed', techs: ['Angular', 'WebSocket', 'Chart.js'], description: 'Dashboard crypto temps réel via WebSocket avec graphiques et portefeuille simulé.', longDescription: "CryptoTrack connecte en temps réel à des flux WebSocket.", github: 'https://github.com/sana-alaoui/cryptotrack', status: 'Privé', date: '05 avr. 2026', year: '2026', type: 'Finance' },
  { id: 6, name: 'FitPlan', initial: 'F', color: '#dc2626', techs: ['React', 'Node.js', 'PostgreSQL'], description: 'Application de planning sportif avec programmes personnalisés et suivi GPS.', longDescription: "FitPlan est une app fitness complète.", github: 'https://github.com/sana-alaoui/fitplan', status: 'Publié', date: '12 déc. 2025', year: '2025', type: 'Santé' },
  { id: 7, name: 'DesignHub', initial: 'D', color: '#0f766e', techs: ['React', 'TypeScript', 'Prisma'], description: 'Portfolio collaboratif de designers avec système de vote et export PDF.', longDescription: "DesignHub est une communauté pour les designers.", github: 'https://github.com/sana-alaoui/designhub', status: 'Brouillon', date: '28 nov. 2025', year: '2025', type: 'Design' },
  { id: 8, name: 'NewsFlow', initial: 'N', color: '#1d4ed8', techs: ['Node.js', 'REST API', 'Redis'], description: 'Agrégateur de news avec IA pour catégorisation et newsletters personnalisées.', longDescription: "NewsFlow agrège des milliers de sources d'actualité.", github: 'https://github.com/sana-alaoui/newsflow', status: 'Brouillon', date: '15 oct. 2025', year: '2025', type: 'Media' },
];

const DEFAULT_SKILLS: Skill[] = [
  { id: 1,  name: 'Angular',      level: 95, category: 'Frontend', icon: '🔺' },
  { id: 2,  name: 'TypeScript',   level: 90, category: 'Langage',  icon: '📘' },
  { id: 3,  name: 'RxJS',         level: 85, category: 'Frontend', icon: '🔄' },
  { id: 4,  name: 'NgRx',         level: 75, category: 'Frontend', icon: '🗃️' },
  { id: 5,  name: 'Node.js',      level: 80, category: 'Backend',  icon: '🟢' },
  { id: 6,  name: 'REST API',     level: 88, category: 'Backend',  icon: '🔗' },
  { id: 7,  name: 'MongoDB',      level: 72, category: 'Backend',  icon: '🍃' },
  { id: 8,  name: 'PostgreSQL',   level: 68, category: 'Backend',  icon: '🐘' },
  { id: 9,  name: 'React',        level: 65, category: 'Frontend', icon: '⚛️' },
  { id: 10, name: 'SCSS / CSS',   level: 92, category: 'Design',   icon: '🎨' },
  { id: 11, name: 'Git / GitHub', level: 90, category: 'Outils',   icon: '⬡'  },
  { id: 12, name: 'Docker',       level: 60, category: 'Outils',   icon: '🐳' },
  { id: 13, name: 'WebSocket',    level: 70, category: 'Backend',  icon: '📡' },
  { id: 14, name: 'Figma',        level: 78, category: 'Design',   icon: '✏️' },
];

@Injectable({ providedIn: 'root' })
export class DataService {

  // ✅ Charger depuis localStorage au démarrage, sinon utiliser les données par défaut
  private _projects = new BehaviorSubject<Project[]>(this.loadProjects());
  private _skills   = new BehaviorSubject<Skill[]>(this.loadSkills());

  // ─── Chargement depuis localStorage ───────────────────────────────────────

  private loadProjects(): Project[] {
    try {
      const saved = localStorage.getItem(PROJECTS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  }

  private loadSkills(): Skill[] {
    try {
      const saved = localStorage.getItem(SKILLS_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SKILLS;
    } catch {
      return DEFAULT_SKILLS;
    }
  }

  // ─── Sauvegarde dans localStorage ─────────────────────────────────────────

  private saveProjects(projects: Project[]): void {
    try {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Erreur sauvegarde projets:', e);
    }
  }

  private saveSkills(skills: Skill[]): void {
    try {
      localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
    } catch (e) {
      console.error('Erreur sauvegarde skills:', e);
    }
  }

  // ─── Observables publics ──────────────────────────────────────────────────

  get projects$(): Observable<Project[]> { return this._projects.asObservable(); }
  get skills$():   Observable<Skill[]>   { return this._skills.asObservable(); }

  get projects(): Project[] { return this._projects.getValue(); }
  get skills():   Skill[]   { return this._skills.getValue(); }

  // ─── Méthodes Projects ────────────────────────────────────────────────────

  getProjectById(id: number): Project | undefined {
    return this._projects.getValue().find(p => p.id === id);
  }

  addProject(p: Omit<Project, 'id'>): void {
    const list = this._projects.getValue();
    const id   = list.length ? Math.max(...list.map(x => x.id)) + 1 : 1;
    const next = [...list, { ...p, id }];
    this._projects.next(next);
    this.saveProjects(next); // ✅ persister
  }

  updateProject(id: number, changes: Partial<Project>): void {
    const next = this._projects.getValue().map(p => p.id === id ? { ...p, ...changes } : p);
    this._projects.next(next);
    this.saveProjects(next); // ✅ persister
  }

  deleteProject(id: number): void {
    const next = this._projects.getValue().filter(p => p.id !== id);
    this._projects.next(next);
    this.saveProjects(next); // ✅ persister
  }

  // ─── Méthodes Skills ──────────────────────────────────────────────────────

  addSkill(s: Omit<Skill, 'id'>): void {
    const list = this._skills.getValue();
    const id   = list.length ? Math.max(...list.map(x => x.id)) + 1 : 1;
    const next = [...list, { ...s, id }];
    this._skills.next(next);
    this.saveSkills(next); // ✅ persister
  }

  updateSkill(id: number, changes: Partial<Skill>): void {
    const next = this._skills.getValue().map(s => s.id === id ? { ...s, ...changes } : s);
    this._skills.next(next);
    this.saveSkills(next); // ✅ persister
  }

  deleteSkill(id: number): void {
    const next = this._skills.getValue().filter(s => s.id !== id);
    this._skills.next(next);
    this.saveSkills(next); // ✅ persister
  }

  // ─── Utilitaire : reset aux données par défaut ────────────────────────────

  resetToDefaults(): void {
    localStorage.removeItem(PROJECTS_KEY);
    localStorage.removeItem(SKILLS_KEY);
    this._projects.next(DEFAULT_PROJECTS);
    this._skills.next(DEFAULT_SKILLS);
  }
}