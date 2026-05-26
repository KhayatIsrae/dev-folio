import { Injectable } from '@angular/core';
import { Project } from './project.interface';

//service des projets

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 1,
      title: "Portfolio Angular",
      description: "Application portfolio personnelle avec interface admin et gestion des projets.",
      technologies: ["Angular", "TypeScript", "CSS"],
      status: "public",
      source: "https://github.com/username/portfolio"
    },

    {
      id: 2,
      title: "Library Management System",
      description: "Application de gestion de bibliothèque avec CRUD des livres et utilisateurs.",
      technologies: ["Java", "Spring Boot", "MySQL"],
      status: "public",
      source: "https://github.com/username/library-system"
    },

    {
      id: 3,
      title: "E-learning Platform",
      description: "Plateforme d’apprentissage en ligne avec cours et suivi des étudiants.",
      technologies: ["Node.js", "Express", "MongoDB"],
      status: "private",
      source: "https://github.com/username/elearning"
    },

    {
      id: 4,
      title: "Chat Application",
      description: "Application de messagerie en temps réel avec WebSocket.",
      technologies: ["Angular", "Socket.io", "Node.js"],
      status: "public",
      source: "https://github.com/username/chat-app"
    },

    {
      id: 5,
      title: "Task Manager",
      description: "Application de gestion de tâches avec authentification et filtres.",
      technologies: ["Angular", "Firebase"],
      status: "draft",
      source: "https://github.com/username/task-manager"
    }
    ,

    {
      id: 5,
      title: "plateforme e-commerce",
      description: "Application d'achat de vetement'.",
      technologies: ["nest.js", "react.js", "Node.js"],
      status: "public",
      source:null
    }
  ];

  getPublicProjects(): Project[] {
    return this.projects.filter(p => p.status === 'public');
  }
}
