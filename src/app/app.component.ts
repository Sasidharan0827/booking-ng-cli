import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastMessage, ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'booking-ng-cli';

  toast$: Observable<ToastMessage | null>;

  constructor(private toastService: ToastService) {
    this.toast$ = this.toastService.toast$;
  }

  clearToast(): void {
    this.toastService.clear();
  }
}
