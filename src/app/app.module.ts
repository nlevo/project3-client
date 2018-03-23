import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { PropertyTableComponent } from './property-table/property-table.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PropertyCreateComponent } from './property-create/property-create.component';
import { LoginComponent } from './login/login.component';
import { SessionService } from "./services/session-service.service";
import { SignupComponent } from './register/register.component';
import { AuthService } from "./services/authentification-service.service";
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserServiceService} from './services/user-service.service';
import { PropertyEntriesService } from './services/property-service.service'


//for image uploads
import { FileUploadModule } from "ng2-file-upload";
import { UserListComponent } from './user-list/user-list.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { PropertyEditComponent } from './property-edit/property-edit.component';


const routes: Routes = [
  { path: 'properties', component: PropertyTableComponent },
  { path: 'users/new', component: UserCreateComponent},
  { path: 'users/:id', component: UserProfileComponent},
  { path: 'users', component: UserListComponent},
  { path: 'properties/new', component: PropertyCreateComponent},
  { path: 'properties/:id', component: PropertyDetailsComponent},
  { path: 'properties/:id/edit', component: PropertyEditComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'logout', redirectTo: ''},
  { path: '', component: LoginComponent},

  { path: '**', redirectTo: 'dashboard'}
  
];

@NgModule({
  declarations: [
    AppComponent,
    PropertyTableComponent,
    UserProfileComponent,
    PropertyCreateComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    UserCreateComponent,
    UserListComponent,
    PropertyDetailsComponent,
    PropertyEditComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FileUploadModule,
  ],
  providers: [SessionService, AuthService, UserServiceService, PropertyEntriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
