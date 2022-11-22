import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopOneComponent } from './desktop-one/desktop-one.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { GroupComponent } from './group/group.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserGroupConnectsComponent } from './user-group-connects/user-group-connects.component'
import { SuperUserDashboardComponent } from './super-user-dashboard/super-user-dashboard.component'
import { SuperSuperUserDashboardComponent } from './super-super-user-dashboard/super-super-user-dashboard.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'dashboard',
    component: DesktopOneComponent,
  },
  {
    path: 'group-connect',
    component: GroupComponent,
  },
  {
    path: 'login-option',
    component: AdminComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'user-group-connects',
    component: UserGroupConnectsComponent,
  },
  {
    path: 'super-user-dashoard',
    component: SuperUserDashboardComponent,
  },
  {
    path: 'super-super-user-dashoard',
    component: SuperSuperUserDashboardComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
