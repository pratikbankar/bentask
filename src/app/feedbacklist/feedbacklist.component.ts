import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AlertService } from '../services/alert.service';
import { SearchPipe } from '../pipes/search.pipe';
import 'rxjs/Rx';

@Component({
  selector: 'app-feedbacklist',
  templateUrl: './feedbacklist.component.html',
  styleUrls: ['./feedbacklist.component.css']
})
export class FeedbacklistComponent implements OnInit {

  userdata: any;
  empname: any;
  empid: any;
  url: string;
  model: any = {};
  listdata: any;
  listsingledata: any;
  data:any;
  res:any;
  role: any;
  getid: any;
  isEditable: boolean=false;
  aa:boolean=false;
  searchString: string;
  
  
  constructor(private dataService: DataService,private searchFilterPipe:SearchPipe,private router: Router,private route: ActivatedRoute,private alertService: AlertService) { }

  ngOnInit() {
    this.userdata=JSON.parse(localStorage.getItem('user'));
    if(this.userdata ==null) {
      this.router.navigate(['/login']);
        }
    this.model.empid=this.userdata.user.id;
    this.model.role=this.userdata.user.role;
    this.role=this.userdata.user.role;

    console.log(this.model.role);
    
    this.fetchFeedbackList();
  }

  setIndex(ii){
    this.aa=ii;
    console.log
  }
  fetchFeedbackList() {
    //  this.url = "/getPlanNames.php";
    this.url = "/fetch-operations.php";
    this.model.option = 'fetch-feedbacklist';
    this.dataService.fetchForMdata(this.model, this.url).subscribe(data => {
      this.listdata = data;
      this.listdata=this.listdata.data;
    });
  }

  editRow(event){
    this.isEditable=true;
  this.getid=event.id;
  this.model.mngcomment=event.mng_comment;
  }

  updateRow(event){

    if(this.model.mngrating ==null) {
      this.model.mngrating=event.mng_rating;
    }
    this.model.fid=event.id;
    this.url = "/fetch-operations.php";
    this.model.option = 'update-mng-feedback';
    this.dataService.fetchForMdata(this.model, this.url).subscribe(data => {
    this.res = data;
     if (this.res.status == false) {
      this.alertService.error(this.res.message);
  
     }
     else {
       this.alertService.success(this.res.message, true);
       this.fetchFeedbackList();
       this.getid=100000;
     }
   });

  }

  onRatingSet(event){
    this.model.mngrating=event;

  }

  fetchFeedbackMgrList() {
    //  this.url = "/getPlanNames.php";
    this.url = "/fetch-operations.php";
    this.model.option = 'fetch-feedbacklist';
    this.dataService.fetchForMdata(this.model, this.url).subscribe(data => {
      this.listdata = data;
      this.listdata=this.listdata.data;
    });
  }

  deletefeedbackbefore(event) {
    this.model.fid=event;
 }

  deletefeedback(){
 //  this.url = "/getPlanNames.php";
  this.url = "/fetch-operations.php";
  this.model.option = 'delete-feedback';
  this.dataService.fetchForMdata(this.model, this.url).subscribe(data => {
  this.res = data;
   if (this.res.status == false) {
    this.alertService.error(this.res.message);

   }
   else {
     this.alertService.success(this.res.message, true);
     this.fetchFeedbackList();
   }
 });
   
  }
  

}
