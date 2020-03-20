import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable ,  Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = true;

  constructor(private router: Router) {
      // clear alert message on route change
      router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              if (this.keepAfterNavigationChange) {
                  // only keep for a single location change
                  this.keepAfterNavigationChange = false;
              } else {
                  // clear alert
                  this.subject.next();
              }
          }
      });
  }

  success(message: string, keepAfterNavigationChange = true) {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({ type: 'success', text: message });
  }

  getAlert(): Observable<any> {
      return this.subject.asObservable();
  }

  error(message: string, keepAfterNavigationChange = true) {
      this.keepAfterNavigationChange = keepAfterNavigationChange;
      this.subject.next({ type: 'error', text: message });
  }

  clear() {
      // clear alerts
      this.subject.next();
  }
  
  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}
