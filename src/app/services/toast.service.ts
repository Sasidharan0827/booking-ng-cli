import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'warning';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  readonly toast$ = this.toastSubject.asObservable();
  private dismissTimer: ReturnType<typeof setTimeout> | null = null;

  show(message: string, type: ToastType = 'success'): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
    }

    this.toastSubject.next({ message, type });
    this.dismissTimer = setTimeout(() => this.clear(), 3000);
  }

  clear(): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = null;
    }

    this.toastSubject.next(null);
  }
}
