import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertComponent {
    message: any;
    newid: any;
    oldid: any;
    hideFlag:boolean=false;
    constructor(private alertService: AlertService) { }

    ngOnInit() {
     
        this.alertService.getMessage().subscribe(message => { this.message = message;
            var that = this;
            this.hideFlag=false;
             setTimeout(function(){
                that.hideFlag = true;
              },5000);
        });
       
    }
}