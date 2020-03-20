import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AlertService } from '../services/alert.service';
import 'rxjs/Rx';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  userdata: any;
  empname: any;
  empid: any;
  url: string;
  model: any = {};
  projectdata: any;
  submit:boolean=true;
  update:boolean=false;
  data:any;
  res:any;
  listsingledata: any;
  rating:any;
  projecterror:boolean=false;
  commenterror:boolean=false;
 

  constructor(private dataService: DataService,private router: Router,private route: ActivatedRoute,private alertService: AlertService) { }

  ngOnInit() {
    this.userdata=JSON.parse(localStorage.getItem('user'));
    if(this.userdata ==null) {
      this.router.navigate(['/login']);
        }
    this.model.empname=this.userdata.user.name;
    this.model.empid=this.userdata.user.id;
   
    
    this.rating=0;
    var feedbackid = this.route.snapshot.params['id'];
    if(feedbackid !=null) {
     this.getSingleData(feedbackid);
     this.model.fid=feedbackid;
     this.submit=false;
     this.update=true;
     this.rating=localStorage.getItem('emprating');
     
    } 
  
  this.model.projectname=0;
  
    this.fetchProject();
    
  }


  onRatingSet(event){
    if(event > 0) {
   this.model.rating=event;
  } else { this.model.rating=this.rating; }
  }
  
  fetchProject() {
    //  this.url = "/getPlanNames.php";
    this.url = "/fetch-operations.php";
    this.model.option = 'fetch-project';
    this.dataService.fetchForMdata(this.model, this.url).subscribe(data => {
      this.projectdata = data;
      this.projectdata=this.projectdata.data;
    });
  }

  getSingleData(path: any) {
    this.url = '/fetch-operations.php';
    this.model.option='fetch-single-feedback';
    this.model.fid=path;
    
    this.dataService.fetchForMdata(this.model,this.url)
      .subscribe(
        data => {
          this.listsingledata = data;
          this.listsingledata=this.listsingledata.data;
          this.model.projectname=this.listsingledata.project_id;
          this.model.comment=this.listsingledata.emp_comment;
          this.rating=this.listsingledata.emp_rating;
          localStorage.setItem('emprating',this.rating);
          
    })
  }

  addfeedback() {
    //  this.url = "/getPlanNames.php";
    if(this.model.projectname==0){
      this.projecterror=true;
      return false;

    }
    if(this.model.comment ==null){
      this.commenterror=true;
      return false;

    }
    this.url = "/fetch-operations.php";
    this.model.option = 'add-feedback';
    this.dataService.fetchForMdata(this.model, this.url).subscribe(data => {
      this.res = data;
      if (this.res.status == false) {
       this.alertService.error(this.res.message);

      }
      else {
        this.alertService.success(this.res.message, true);
        this.router.navigate(['/feedbacklist']);
      }
    });
  }

  updatefeedback() {
    //  this.url = "/getPlanNames.php";
    this.url = "/fetch-operations.php";
    this.model.option = 'update-feedback';
    this.dataService.fetchForMdata(this.model, this.url).subscribe(data => {
      this.res = data;
      if (this.res.status == false) {
       this.alertService.error(this.res.message);

      }
      else {
        this.alertService.success(this.res.message, true);
        this.router.navigate(['/feedbacklist']);
      }
    });
  }
  

}
