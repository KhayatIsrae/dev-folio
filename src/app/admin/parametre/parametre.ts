import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { ProfilService } from '../services/profil';

@Component({
  selector: 'app-parametre',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './parametre.html',
  styleUrl: './parametre.css',
})
export class Parametre {

  profile!: ReturnType<typeof this.profilService.profil>;
  contact!: ReturnType<typeof this.profilService.contact>;

  security = {
    currentPass:  '',
    newPass:      '',
    confirmPass:  '',
  };

  constructor(
    private toast:         ToastService,
    private profilService: ProfilService
  ) {
    this.profile = { ...this.profilService.profil() };
    this.contact = { ...this.profilService.contact() };
  }

  saveProfile(): void {
    try {
      if (!this.profile.firstName?.trim() || !this.profile.lastName?.trim()) {
        this.toast.error('Le prénom et le nom sont obligatoires');
        return;
      }
      this.profilService.updateProfil({ ...this.profile });
      this.toast.success('Profil enregistré ✓');
    } catch {
      this.toast.error('Erreur lors de l\'enregistrement du profil');
    }
  }

  saveContact(): void {
    try {
      if (!this.contact.email?.trim()) {
        this.toast.error('L\'email est obligatoire');
        return;
      }
      this.profilService.updateContact({ ...this.contact });
      this.toast.success('Informations de contact sauvegardées ✓');
    } catch {
      this.toast.error('Erreur lors de la sauvegarde des contacts');
    }
  }

  changePassword(): void {
    const { currentPass, newPass, confirmPass } = this.security;

    if (!currentPass || !newPass || !confirmPass) {
      this.toast.error('Veuillez remplir tous les champs');
      return;
    }
    if (currentPass !== '1234') {
      this.toast.error('Mot de passe actuel incorrect');
      return;
    }
    if (newPass.length < 4) {
      this.toast.error('Le nouveau mot de passe doit contenir au moins 4 caractères');
      return;
    }
    if (newPass !== confirmPass) {
      this.toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    this.toast.success('Mot de passe mis à jour ✓');
    this.security = { currentPass: '', newPass: '', confirmPass: '' };
  }

  exportData(): void {
    try {
      const data = {
        profil:   this.profilService.profil(),
        contact:  this.profilService.contact(),
        exportAt: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = 'portfolio-data.json';
      a.click();
      URL.revokeObjectURL(url);
      this.toast.success('Données exportées ✓');
    } catch {
      this.toast.error('Erreur lors de l\'export');
    }
  }

  confirmReset(): void {
    const confirmed = confirm(
      'Réinitialiser toutes les données du portfolio ? Cette action est irréversible.'
    );
    if (confirmed) {
      try {
        this.profilService.reset();
        this.profile = { ...this.profilService.profil() };
        this.contact = { ...this.profilService.contact() };
        this.toast.success('Portfolio réinitialisé ✓');
      } catch {
        this.toast.error('Erreur lors de la réinitialisation');
      }
    }
  }
}