import { Injectable } from '@angular/core';
import { AlertService} from './alert.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/index';
import { Router } from '@angular/router';
import { URLService} from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isUserLoggedIn;

  constructor(private http: HttpClient,
  private router: Router,
  private alertService:AlertService,
  private urlService:URLService) { 
    this.isUserLoggedIn = false;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
  
   setUserLoggedIn() {
    this.isUserLoggedIn = true;
    
   
  }

  login(user:User)
  {
    return this.http.post(this.urlService.url_path+'/login.php', JSON.stringify(user));
   }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('user');
      localStorage.removeItem('emprating');
      localStorage.removeItem('isUserLoggedIn');
      this.isUserLoggedIn=false;
      this.alertService.success("Logout successfully...");
      this.router.navigate(['/login']);
  }

  public getCurrentUser(){
    if (localStorage.getItem('user')){
     return JSON.parse(localStorage.getItem('user')).user;
    } else return "";
  }
}
