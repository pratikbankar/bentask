import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AlertComponent} from './_directives/alert.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NgxStarsModule } from 'ngx-stars';
import { FeedbacklistComponent } from './feedbacklist/feedbacklist.component';
import { CheckedDirective } from './checked.directive';
import { SearchPipe } from './pipes/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    FeedbackComponent,
    FeedbacklistComponent,
    CheckedDirective,
    SearchPipe
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxStarsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  providers: [AlertService,SearchPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
