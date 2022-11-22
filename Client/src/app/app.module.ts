import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginPageComponent } from './login-page/login-page.component';
import { GroupComponent } from './group/group.component';
import { DesktopOneComponent } from './desktop-one/desktop-one.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserGroupConnectsComponent } from './user-group-connects/user-group-connects.component';
import { SuperUserDashboardComponent } from './super-user-dashboard/super-user-dashboard.component';
import { SuperSuperUserDashboardComponent } from './super-super-user-dashboard/super-super-user-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DesktopOneComponent,
    GroupComponent,
    AdminComponent,
    AdminDashboardComponent,
    UserGroupConnectsComponent,
    SuperUserDashboardComponent,
    SuperSuperUserDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#4882c2',
      outerStrokeGradientStopColor: '#53a9ff',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      subtitle: 'Connects',
      animateTitle: false,
      animationDuration: 1000,
      showUnits: false,
      showBackground: false,
      clockwise: false,
      startFromZero: false,
      lazy: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
