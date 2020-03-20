import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/index';
import 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  loginForm: FormGroup;
  model: any = {};
  res:any;
  submitted = false;
  errorshow=false;
  message:string;
  errorclass: string;

  constructor( private formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router,private authenticationService: AuthenticationService,private userService: UserService,private alertService: AlertService) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get f() { return this.loginForm.controls; }
  login() { 

    this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

    this.loading = true;
    let formData = new FormData();
   this.alertService.clear();
    this.authenticationService.login(this.model)
      .subscribe(data => {
        this.res = data;
        console.log(this.res.status);
        console.log(this.res.message);
       
        if (this.res.status == false) {
          // this.errorshow=true;
          // this.errorclass="alert alert-danger text-center";
          // this.message=this.res.message;
         this.alertService.error(this.res.message);

        }
        else {
          // this.errorshow=true;
          // this.errorclass="alert alert-success text-center";
          // this.message=this.res.message;
          localStorage.setItem('user',JSON.stringify(this.res));
          this.userService.setLoggedInUser(true);
          this.alertService.success(this.res.message, true);
          this.router.navigate(['/dashboard']);
        }
       
      },
        error => {
          console.log("Invalid username or password");
          this.alertService.error(error);
        });  
   }

}
