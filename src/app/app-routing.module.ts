import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionUserComponent } from './action-user/action-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { PermissionsComponent } from './permissions/permissions.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'edit'
  },
  {
    path: 'list',
    component: ListUsersComponent
  },
  {
    path: 'edit/:user',
    component: ActionUserComponent,
    data: { action: 'edit' }
  },
  {
    path: 'create',
    component: ActionUserComponent,
    data: { action: 'create' }
  },
  {
    path: 'permissions/:user',
    component: PermissionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
