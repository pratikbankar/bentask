import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserService} from './services/user.service';
import { URLService} from './services/url.service';
import { AuthenticationService} from './services/authentication.service';
import { FeedbacklistComponent } from './feedbacklist/feedbacklist.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'feedback',
    component: FeedbackComponent
  },

  {
    path:'feedback/:id',
    component: FeedbackComponent
   
  },

  {
    path: 'feedbacklist',
    component: FeedbacklistComponent
  },


  {
    path: '**',
    component: LoginComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

  providers: [UserService,AuthenticationService,URLService]
})
export class AppRoutingModule { }
