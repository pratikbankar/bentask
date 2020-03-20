import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userdata:any;
  isUserLoggedIn: boolean;
  role: any;
  routurlclass: string;
  routurlclasssecond: string;
  routurlclassthird: string;
  routurlclassc: string;
  routurlclasssecondc: string;
  routurlclassthirdc: string;
  constructor(public authenticationService: AuthenticationService,private alertService: AlertService,private router: Router, private userService: UserService) { }

  ngOnInit() {
    if(this.router.url==='/dashboard') {
      this.routurlclass='active';
      this.routurlclassc='true';
    } else if(this.router.url==='/feedback'){
      this.routurlclasssecond='active';
      this.routurlclasssecondc='true';
    } else if(this.router.url==='/feedbacklist'){
      this.routurlclassthird='active';
      this.routurlclassthirdc='true';
    }

    
    this.userdata=JSON.parse(localStorage.getItem('user'));
    if(this.userdata ==null) {
      this.router.navigate(['/login']);
        }
    this.role=this.userdata.user.role;
    this.isUserLoggedIn=this.userService.getUserLoggedIn();
    console.log(this.isUserLoggedIn);
  }
  logout() {
    this.authenticationService.logout();
    this.userService.setLoggedInUserlogout(); 
    this.alertService.success("Logout successfully..");
    this.router.navigate(['/login']);
  }

}
