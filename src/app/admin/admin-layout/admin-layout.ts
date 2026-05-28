import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayoutComponent {

  navItems = [
    { route: '/admin/overview', icon: '⊞', label: 'Vue d\'ensemble' },
    { route: '/admin/projets', icon: '◈', label: 'Projets' },
    { route: '/admin/competences', icon: '★', label: 'Compétences' },
    { route: '/admin/messages', icon: '✉', label: 'Messages' },
    { route: '/admin/parametres', icon: '⚙', label: 'Paramètres' },
  ];

  constructor(public auth: AuthService) {}
}