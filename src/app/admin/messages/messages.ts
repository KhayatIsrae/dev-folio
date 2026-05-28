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
  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
  }
  handleLu(ind: number): void {
    this.messageService.markSeen(ind);
  }
  handlesupprimer(ind: number): void {
    this.messages=this.messageService.deleteMessage(ind);
  }
}