import { Injectable } from '@angular/core';
import { Message } from './message.interface';

@Injectable({ providedIn: 'root' })
export class MessageService {

  private messages: Message[] = [
    {
      name: 'Ahmed Benali',
      email: 'ahmed.benali@gmail.com',
      subject: 'Demande de collaboration',
      message: 'Bonjour Israe, je souhaiterais collaborer avec vous sur un projet Angular.',
      status: 'unseen',
    },
    {
      name: 'Sara El Idrissi',
      email: 'sara.dev@hotmail.com',
      subject: 'Question concernant votre portfolio',
      message: 'Bonsoir, j’aime beaucoup le design de votre portfolio.',
      status: 'seen',
    }
  ];

  constructor() {
    this.initStorage();
  }

  private initStorage(): void {
    if (!localStorage.getItem('messages')) {
      localStorage.setItem('messages', JSON.stringify(this.messages));
    }
  }

  private load(): Message[] {
    return JSON.parse(localStorage.getItem('messages') || '[]');
  }

  private save(messages: Message[]): void {
    localStorage.setItem('messages', JSON.stringify(messages));
  }

  getMessages(): Message[] {
    return this.load();
  }

  addMessage(msg: Message): void {
    const messages = this.load();
    messages.unshift(msg);
    this.save(messages);
  }

  markSeen(index: number): void {
    const messages = this.load();
    messages[index].status = 'seen';
    this.save(messages);
  }

  deleteMessage(index: number): void {
    const messages = this.load();
    messages.splice(index, 1);
    this.save(messages);
  }

  total(): number {
    return this.load().length;
  }
}