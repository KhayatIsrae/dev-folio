import { Component } from '@angular/core';
import { MessageService } from '../../message';
import { OnInit } from '@angular/core';
import { Message } from '../../message.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [CommonModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit {
  messages: Message[] = [];
  public constructor(
    private messageService: MessageService
  ) { }

  loadMessages(): void {
    this.messages = this.messageService.getMessages();
  }
  ngOnInit(): void {
    this.loadMessages();
  }
  handleLu(ind: number): void {
    this.messageService.markSeen(ind);
    this.loadMessages();
  }
  handlesupprimer(ind: number): void {
    this.messageService.deleteMessage(ind);
    this.loadMessages();
  }
}