import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './sso.config';
import { Router } from '@angular/router';
import { GlobalServiceService } from './service/global-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hr-tracker-app';
  excelData: any;

  constructor(
    private oauthService: OAuthService,
    public router: Router,
    private http: HttpClient,
    private globalService: GlobalServiceService
  ) {
    this.configureSingleSignOn();
  }

  // constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.globalService.getData();
  }


  configureSingleSignOn() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get token() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }
}
