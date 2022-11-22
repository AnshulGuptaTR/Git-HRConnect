import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../service/global-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  
  constructor(private globalService: GlobalServiceService, private router: Router,) {}

  ngOnInit(): void {
    this.globalService.adminLoginRenderFn(this.redirectOptionPage.bind(this));
    // localStorage.clear();
  }

  LoginUser(userName:any) {
    var res = this.globalService.getAdminDetails(userName.value);
    console.log(res);
  }

  redirectOptionPage() {
    this.router.navigate(['/login-option'])
  }
}
