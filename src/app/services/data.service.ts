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
export class DataService {

  constructor(private http: HttpClient,
    private router:Router,
    private urlService:URLService) { }

    fetchForMdata(model,url){
      return this.http.post(this.urlService.url_path+url,JSON.stringify(model)).
      map(res=>res);
    }
}
