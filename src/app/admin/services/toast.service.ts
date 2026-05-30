import { Injectable, Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

/* ─── Interface ─────────────────────────────────────────── */

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

/* ─── Service ───────────────────────────────────────────── */

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _toasts = new BehaviorSubject<Toast[]>([]);
  toasts$ = this._toasts.asObservable();

  private show(message: string, type: Toast['type']): void {
    const id = Date.now();
    this._toasts.next([...this._toasts.getValue(), { id, message, type }]);
    setTimeout(() => this.remove(id), 3500);
  }

  success(msg: string): void { this.show(msg, 'success'); }
  error(msg: string):   void { this.show(msg, 'error');   }
  info(msg: string):    void { this.show(msg, 'info');    }

  remove(id: number): void {
    this._toasts.next(this._toasts.getValue().filter(t => t.id !== id));
  }
}

/* ─── Composant ─────────────────────────────────────────── */

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: center;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
      cursor: pointer;
      pointer-events: auto;
      animation: slideUp 0.25s ease;
    }

    .toast.success { background: #1e1e1e; color: #ffffff; border: 1px solid #333333; }
    .toast.error   { background: #3a1a1a; color: #f87171; border: 1px solid #7f1d1d; }
    .toast.info    { background: #1a1e2e; color: #93c5fd; border: 1px solid #1e3a5f; }

    .toast.success .icon { color: #4ade80; }
    .toast.error   .icon { color: #f87171; }
    .toast.info    .icon { color: #93c5fd; }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
  `],
  template: `
    <div class="toast-container">
      <div
        *ngFor="let t of toasts"
        class="toast"
        [ngClass]="t.type"
        (click)="toastService.remove(t.id)"
      >
        <span class="icon">
          {{ t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ' }}
        </span>
        {{ t.message }}
      </div>
    </div>
  `,
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private sub!: Subscription;

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {
    this.sub = this.toastService.toasts$.subscribe(t => this.toasts = t);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}