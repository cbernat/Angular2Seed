import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { UserListComponent }  from './user/user-list.component';
import { UserDetailComponent }  from './user/user-detail.component';
import { HeaderComponent }  from './header.component';
import { UserService }         from './user/user.service';
import { FooterComponent } from './footer.component'; 


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot([
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'users/:id',
        component: UserDetailComponent
      },
    ])
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
