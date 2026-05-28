import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Accueil } from './pages/accueil/accueil';
import { ListeProjet } from './pages/liste-projet/liste-projet';
import { Competences } from './pages/competences/competences';
import { Contact } from './pages/contact/contact';
import { DetailProject } from './pages/detail-project/detail-project';
import { LoginComponent } from './admin/login/login';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout';
import { authGuard } from './admin/guards/auth-guard';
import { AdminProjectsComponent } from './admin/projets/projets';
import { AdminSkillsComponent } from './admin/competences/competences';
import { Messages } from './admin/messages/messages';

export const routes: Routes = [

  /* PUBLIC */
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
      { path: 'contact', component: Contact },
      { path: 'project/:id', component: DetailProject }
    ]
  },

  /* ADMIN LOGIN */
  {
    path: 'admin/login',
    component: LoginComponent
  },

  /* REDIRECTION /admin → /admin/login */
  {
    path: 'admin',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  },

  /* ADMIN PANEL */
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: Accueil, canActivate: [authGuard] },
      { path: 'projets', component: AdminProjectsComponent, canActivate: [authGuard] },
      { path: 'competences', component: AdminSkillsComponent, canActivate: [authGuard] },
      { path: 'messages', component: Messages, canActivate: [authGuard] }
    ]
  },

  /* NOT FOUND */
  {
    path: '**',
    redirectTo: 'dashboard'
  }

];