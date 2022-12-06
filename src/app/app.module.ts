import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryPgComponent } from './category/category-pg/category-pg.component';
import { CategoryPopupComponent } from './category/category-popup/category-popup.component';
import { PopupComponent } from './popup/popup.component';
import { AddUserComponent } from './students/add-user/add-user.component';
import { ActiveUsersComponent } from './students/active-users/active-users.component';
import { UpdateUserComponent } from './students/update-user/update-user.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CategoryPgComponent,
    CategoryPopupComponent,
    PopupComponent,
    AddUserComponent,
    ActiveUsersComponent,
    UpdateUserComponent,
    StudentsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right',timeOut:2000 }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
