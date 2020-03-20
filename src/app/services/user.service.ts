import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import {  HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import {URLService} from './url.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
    private router:Router,
    private urlService:URLService
  ) { }
 
  getUser() {
    return JSON.parse(localStorage.getItem('id'));
  }
  
  private isUserLoggedIn: boolean = false;
  public setLoggedInUser(flag) { 
    this.isUserLoggedIn= flag;
    console.log(this.isUserLoggedIn);
  }

public getUserLoggedIn(): boolean {
  if(localStorage.getItem('user')){
    return this.isUserLoggedIn=true;
  }
  else {
    return this.isUserLoggedIn=false;
  }
  
  
}

public setLoggedInUserlogout(): boolean {
  
    return this.isUserLoggedIn=false;
   
}

  getToken(token:string){
    return [token];
  }

  

   
}
