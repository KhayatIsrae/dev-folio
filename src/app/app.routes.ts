import { Routes } from '@angular/router';

import { Dashboard } from './pages/dashboard/dashboard';
import { Accueil } from './pages/accueil/accueil';
import { ListeProjet } from './pages/liste-projet/liste-projet';
import { Competences } from './pages/competences/competences';
import { Contact } from './pages/contact/contact';
import { DetailProject } from './pages/detail-project/detail-project';

import { LoginComponent } from './admin/login/login';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout';

import { authGuard }from './admin/guards/auth-guard';
import {AdminProjectsComponent} from './admin/projets/projets'
import {AdminSkillsComponent} from './admin/competences/competences'

export const routes: Routes = [

  /* =========================
     PUBLIC
  ========================== */

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', component: Accueil },
      { path: 'projets', component: ListeProjet },
      { path: 'competences', component: Competences },
      { path: 'contact', component: Contact }
    ]
  },

  {
    path: 'project-details',
    component: DetailProject
  },

  /* =========================
     ADMIN LOGIN
  ========================== */

  {
    path: 'admin/login',
    component: LoginComponent
  },

  /* =========================
     ADMIN DASHBOARD (MENU + LAYOUT)
  ========================== */

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [

      { path: '', redirectTo: 'overview', pathMatch: 'full' },

      {
        path: 'overview',
        component: Accueil   // ou AdminOverviewComponent si tu as
      },

      {
        path: 'projets',
        component: AdminProjectsComponent // ou AdminProjetsComponent
      },

      {
        path: 'competences',
        component: AdminSkillsComponent // ou AdminCompetencesComponent
      },

      {
        path: 'messages',
        component: Contact // placeholder (ou admin messages)
      }

    ]
  }

];