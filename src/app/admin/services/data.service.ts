// src/app/core/services/data.service.ts

import { Injectable } from '@angular/core';
import { Project, Skill } from '../../core/models/index';

@Injectable({ providedIn: 'root' })
export class DataService {

  /* =========================================================
     PROJECTS
  ========================================================= */
  projects: Project[] = [
    { id: 1, name: 'TaskFlow', initial: 'T', color: '#3b82f6', techs: ['Angular', 'RxJS', 'TypeScript'], description: 'Application de gestion de tâches avec Kanban, drag & drop, et synchronisation temps réel via RxJS.', longDescription: "TaskFlow est une application de gestion de tâches avancée construite avec Angular 17 et RxJS. Elle offre une interface Kanban intuitive avec drag & drop natif, des notifications en temps réel, une gestion multi-projets et un système de filtres avancés. Le state management est entièrement réalisé avec des BehaviorSubjects RxJS sans NgRx pour rester léger.", github: 'https://github.com/sana-alaoui/taskflow', liveUrl: 'https://taskflow.sana.dev', status: 'Publié', date: '15 mars 2026', year: '2026', type: 'Application Web', featured: true },
    { id: 2, name: 'ShopNow', initial: 'S', color: '#059669', techs: ['Angular', 'Node.js', 'MongoDB'], description: 'Plateforme e-commerce complète avec panier, paiement simulé et dashboard vendeur.', longDescription: "ShopNow est une plateforme e-commerce full-stack avec un front Angular 17 et un backend Node.js/Express. Elle inclut un système de panier avec localStorage, un processus de commande complet, un tableau de bord vendeur avec statistiques temps réel, et une gestion des stocks automatique.", github: 'https://github.com/sana-alaoui/shopnow', status: 'Publié', date: '02 févr. 2026', year: '2026', type: 'E-commerce', featured: true },
    { id: 3, name: 'MétéoCity', initial: 'M', color: '#0891b2', techs: ['Angular', 'REST API', 'OpenWeather'], description: "Application météo avec géolocalisation, prévisions 7 jours et alertes personnalisées.", longDescription: "MétéoCity est une application météo moderne qui utilise l'API OpenWeather pour fournir des prévisions précises. Elle intègre la géolocalisation HTML5, des cartes météo interactives, des alertes personnalisées par SMS simulé, et un historique des données sur 30 jours.", github: 'https://github.com/sana-alaoui/meteocity', status: 'Publié', date: '20 janv. 2026', year: '2026', type: 'Application Web', featured: true },
    { id: 4, name: 'EduQuiz', initial: 'Q', color: '#d97706', techs: ['Angular', 'NgRx', 'Firebase'], description: 'Plateforme de quiz éducatifs avec gestion NgRx, scoring et classements.', longDescription: "EduQuiz est une plateforme éducative avec plus de 500 questions réparties en 12 catégories. Elle utilise NgRx pour la gestion d'état complexe, Firebase pour l'authentification et les scores en temps réel, et un système de niveaux adaptatif basé sur les performances.", github: 'https://github.com/sana-alaoui/eduquiz', status: 'Brouillon', date: '10 avr. 2026', year: '2026', type: 'Éducation' },
    { id: 5, name: 'CryptoTrack', initial: 'B', color: '#7c3aed', techs: ['Angular', 'WebSocket', 'Chart.js'], description: 'Dashboard crypto temps réel via WebSocket avec graphiques et portefeuille simulé.', longDescription: "CryptoTrack connecte en temps réel à des flux WebSocket de données crypto. Il affiche des graphiques dynamiques avec Chart.js, permet de simuler un portefeuille d'investissement, envoie des alertes de prix configurables et propose une analyse technique de base.", github: 'https://github.com/sana-alaoui/cryptotrack', status: 'Privé', date: '05 avr. 2026', year: '2026', type: 'Finance' },
    { id: 6, name: 'FitPlan', initial: 'F', color: '#dc2626', techs: ['React', 'Node.js', 'PostgreSQL'], description: 'Application de planning sportif avec programmes personnalisés et suivi GPS.', longDescription: "FitPlan est une app fitness complète avec génération de programmes d'entraînement personnalisés via IA, suivi GPS des sessions en extérieur, analyse biométrique et intégration avec les wearables les plus populaires.", github: 'https://github.com/sana-alaoui/fitplan', status: 'Publié', date: '12 déc. 2025', year: '2025', type: 'Santé' },
    { id: 7, name: 'DesignHub', initial: 'D', color: '#0f766e', techs: ['React', 'TypeScript', 'Prisma'], description: 'Portfolio collaboratif de designers avec système de vote et export PDF.', longDescription: "DesignHub est une communauté en ligne pour les designers. Elle offre un système de showcase de projets, un moteur de recherche par style et technologie, des votes et commentaires, et une génération automatique de présentations PDF.", github: 'https://github.com/sana-alaoui/designhub', status: 'Brouillon', date: '28 nov. 2025', year: '2025', type: 'Design' },
    { id: 8, name: 'NewsFlow', initial: 'N', color: '#1d4ed8', techs: ['Node.js', 'REST API', 'Redis'], description: 'Agrégateur de news avec IA pour catégorisation et newsletters personnalisées.', longDescription: "NewsFlow agrège des milliers de sources d'actualité et utilise le NLP pour catégoriser et résumer automatiquement les articles. Il génère des newsletters personnalisées selon les centres d'intérêt de chaque utilisateur, avec un système de cache Redis pour des performances optimales.", github: 'https://github.com/sana-alaoui/newsflow', status: 'Brouillon', date: '15 oct. 2025', year: '2025', type: 'Media' },
  ];

  private nextProjectId(): number {
    return this.projects.length ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;
  }

  addProject(payload: Omit<Project, 'id'>): void {
    this.projects.push({ id: this.nextProjectId(), ...payload } as Project);
  }

  updateProject(id: number, payload: Partial<Project>): void {
    const idx = this.projects.findIndex(p => p.id === id);
    if (idx !== -1) this.projects[idx] = { ...this.projects[idx], ...payload };
  }

  deleteProject(id: number): void {
    this.projects = this.projects.filter(p => p.id !== id);
  }

  getProject(id: number): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  /* =========================================================
     SKILLS
  ========================================================= */
  skills: Skill[] = [
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

  private nextSkillId(): number {
    return this.skills.length ? Math.max(...this.skills.map(s => s.id)) + 1 : 1;
  }

  addSkill(payload: Omit<Skill, 'id'>): void {
    this.skills.push({ id: this.nextSkillId(), ...payload });
  }

  updateSkill(id: number, payload: Partial<Skill>): void {
    const idx = this.skills.findIndex(s => s.id === id);
    if (idx !== -1) this.skills[idx] = { ...this.skills[idx], ...payload };
  }

  deleteSkill(id: number): void {
    this.skills = this.skills.filter(s => s.id !== id);
  }
}