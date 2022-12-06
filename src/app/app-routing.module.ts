import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPgComponent } from './category/category-pg/category-pg.component';
import { ActiveUsersComponent } from './students/active-users/active-users.component';
import { AddUserComponent } from './students/add-user/add-user.component';
import { StudentsListComponent } from './students/students-list/students-list.component';
import { UpdateUserComponent } from './students/update-user/update-user.component';

const routes: Routes = [
  {path:"",component:CategoryPgComponent},
  {path:"students",component:StudentsListComponent},
  {path:"add-user",component:AddUserComponent},
  {path:"update/:id",component:UpdateUserComponent},
  {path:"user-status",component:ActiveUsersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
