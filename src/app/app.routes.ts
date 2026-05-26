import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Accueil } from './pages/accueil/accueil';
import { ListeProjet } from './pages/liste-projet/liste-projet';
import { Competences } from './pages/competences/competences';
import { Contact } from './pages/contact/contact';
import { DetailProject } from './pages/detail-project/detail-project';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard', component: Dashboard, children: [
            { path: '', component: Accueil },
            { path: 'projets', component: ListeProjet },
            { path: 'competences', component: Competences },
            { path: 'contact', component: Contact },
            { path: 'project/:id', component: DetailProject }
        ]
    },

    // { path: '**', component: PageIntrouvable }
];
