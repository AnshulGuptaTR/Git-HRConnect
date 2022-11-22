import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalServiceService } from '../service/global-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  adminDetails: any;
  adminStatus = 0;
  superUserAccess = 0;
  supsuperUserAccess = 0;
  userAccess = 0;

  constructor(private http: HttpClient, private globalService: GlobalServiceService) { }

  ngOnInit(): void {
    // this.globalService.adminLoginRenderFn(this.setAdmin.bind(this));
    this.setAdmin();
    // console.log(this.globalService.getAdminDetails('Charan'));
  }

  setAdmin() {
    this.adminDetails = localStorage.getItem("userDetails");
    let adminVal = JSON.parse(this.adminDetails);
    this.adminStatus = adminVal.admin;
    this.superUserAccess = adminVal.superuserstatus;
    this.supsuperUserAccess = adminVal.supersuperuserstatus;
    this.userAccess = adminVal.userstatus;
  }

}
