import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfilService } from '../../admin/services/profil';
import { DataService } from '../../admin/services/data.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil {
  private profilService = inject(ProfilService);
  private dataService   = inject(DataService);

  // Signal réactif — le template se met à jour dès que updateProfil() est appelé
  profil = this.profilService.profil;

  // 3 derniers projets publiés
  get projects() {
    return this.dataService.projects
      .filter(p => p.status === 'Publié')
      .slice(-3);
  }
}