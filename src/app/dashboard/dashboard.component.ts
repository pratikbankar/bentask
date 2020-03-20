import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user_detail: any;
  empname: any;
  empid: any;
  username: any;
  role: any;

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.user_detail = JSON.parse(localStorage.getItem('user'));
    if(this.user_detail ==null) {
    this.router.navigate(['/login']);
      }
    this.empname=this.user_detail.user.name;
    this.empid=this.user_detail.user.id;
    this.username=this.user_detail.user.username;
    this.role=this.user_detail.user.role;
   }
}
