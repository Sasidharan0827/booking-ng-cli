import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.activeRequests === 0) {
      this.spinner.show();
    }

    this.activeRequests++;

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;

        if (this.activeRequests === 0) {
          this.spinner.hide();
        }
      })
    );
  }
}
