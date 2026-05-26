import { Injectable } from '@angular/core';
import { Message } from './message.interface';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: Message[] = [

    {
      name: 'Ahmed Benali',
      email: 'ahmed.benali@gmail.com',
      subject: 'Demande de collaboration',
      message:
        'Bonjour Israe, je souhaiterais collaborer avec vous sur un projet Angular.',
      status: 'unseen',
    },

    {
      name: 'Sara El Idrissi',
      email: 'sara.dev@hotmail.com',
      subject: 'Question concernant votre portfolio',
      message:
        'Bonsoir, j’aime beaucoup le design de votre portfolio. Quelles technologies avez-vous utilisées ?',
      status: 'seen',
    },

    {
      name: 'Youssef Amrani',
      email: 'youssef.amrani@gmail.com',
      subject: 'Stage développement web',
      message:
        'Nous recherchons un profil junior pour un stage en développement frontend.',
      status: 'unseen',
    },

    {
      name: 'Fatima Zahra',
      email: 'fatima.zahra@outlook.com',
      subject: 'Proposition de projet',
      message:
        'Je travaille actuellement sur une plateforme éducative et je cherche une développeuse Angular.',
      status: 'seen',
    },

    {
      name: 'Karim Naji',
      email: 'karim.naji@gmail.com',
      subject: 'Feedback portfolio',
      message:
        'Votre portfolio est moderne et bien structuré. Bravo pour le travail réalisé.',
      status: 'seen',
    },
  ];
  addMessage(msg: Message): void {
    this.messages.push(msg);
  }

}