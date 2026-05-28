import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../message';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  nom: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  erreur: string = '';
  succes: string = '';

  public constructor(private messageService: MessageService) { }

  envoyerMessage(): void {
    if (!this.nom || !this.message || !this.email) {
      this.erreur = 'veuillez remplir tous les champs obligatoires(*)';
      this.succes='';
      return;
    }
    this.erreur = '';
    this.messageService.addMessage({ name: this.nom, email: this.email, subject: this.subject, message: this.message, status: 'unseen' });
    this.nom = '';
    this.email = '';
    this.subject = '';
    this.message = '';
    this.succes='message envoyé avec succès!';
  }

}
