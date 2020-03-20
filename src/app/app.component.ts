import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { AlertService } from './services/alert.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'benisontask';
  token: any;
  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService,
    private location: Location,
    private _route: ActivatedRoute) {
      this.route.params
      .switchMap((params: Params) => this.userService.getToken(params['token']))
      .subscribe(token => this.token = token);
    }

    ngOnInit() {
      if (this.userService.getUserLoggedIn() && (this.location.path() == '')) {
        this.router.navigate(['/dashboard']);
      }
    }

    isValid(): boolean {
      if ((this.router.url != '/') && (this.location.path().indexOf('/reset-password/')) && (this.router.url != '/forgot-password') && (this.router.url != '/register-user')  && (this.router.url != '/user-basic-register') && (this.router.url != '/user-bank-register') && (this.router.url != '/user-kyc-register') && (this.router.url != '/registration') && (this.router.url != '/contact-us') && (this.router.url != '/login')) {
        return true;
      }
      return false;
    }
}




