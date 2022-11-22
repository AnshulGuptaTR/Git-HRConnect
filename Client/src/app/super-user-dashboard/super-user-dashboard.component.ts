import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../service/global-service.service';

@Component({
  selector: 'app-super-user-dashboard',
  templateUrl: './super-user-dashboard.component.html',
  styleUrls: ['./super-user-dashboard.component.css']
})
export class SuperUserDashboardComponent implements OnInit {

  appUserName: any;
  hrbpUnderSup: any;
  userMetrix: any;
  userTabTogg = false;
  selectedSpecUserName: any;
  overTabTogg = false;
  quarterlyTimes = [1,2,3,4]
  overallUserMetrix : any;
  totalTA: any;

  constructor(private globalService: GlobalServiceService) { }

  ngOnInit(): void {
    this.setUserInfoFn();
    this.getHrbpUnderSup();
  }
  
  getHrbpUnderSup() {
    this.hrbpUnderSup = localStorage.getItem("excelGrpData");
    let val = JSON.parse(this.hrbpUnderSup);
    this.hrbpUnderSup = val.filter((match:any) => match.reportingtosuperuser == this.appUserName);
  }

  setUserInfoFn() {
    this.appUserName = localStorage.getItem("userDetails");
    let val = JSON.parse(this.appUserName);
    this.appUserName = val.username;
  }

  getSpecificDetails(userData:any) {
    this.userTabTogg = true;
    this.overTabTogg = false;
    this.userMetrix = this.hrbpUnderSup.filter((match:any) => match.username == userData);
    this.selectedSpecUserName = this.userMetrix[0].username;
    this.userMetrix = this.userMetrix[0].targetachieved;
    console.log(this.userMetrix);
  }

  overAllFn() {
    this.userTabTogg = false;
    this.overTabTogg = true;
    this.totalTA = {"skipTar": 0, "skipAch": 0, "nmapTar": 0, "nmapAch": 0, "nhcTar": 0, "nhcAch": 0, "ohsTar": 0, "ohsAch": 0};
    this.hrbpUnderSup.map((instUser:any)=> {
      console.log(instUser.targetachieved[0].q1[0].skip[0].t)
      this.totalTA.skipTar += instUser.targetachieved[0].q1[0].skip[0].t + 
        instUser.targetachieved[0].q2[0].skip[0].t +
        instUser.targetachieved[0].q3[0].skip[0].t +
        instUser.targetachieved[0].q4[0].skip[0].t;
      this.totalTA.skipAch += instUser.targetachieved[0].q1[0].skip[0].a + 
        instUser.targetachieved[0].q2[0].skip[0].a +
        instUser.targetachieved[0].q3[0].skip[0].a +
        instUser.targetachieved[0].q4[0].skip[0].a;

      this.totalTA.nmapTar += instUser.targetachieved[0].q1[0].nmap[0].t + 
        instUser.targetachieved[0].q2[0].nmap[0].t +
        instUser.targetachieved[0].q3[0].nmap[0].t +
        instUser.targetachieved[0].q4[0].nmap[0].t;
      this.totalTA.nmapAch += instUser.targetachieved[0].q1[0].nmap[0].a + 
        instUser.targetachieved[0].q2[0].nmap[0].a +
        instUser.targetachieved[0].q3[0].nmap[0].a +
        instUser.targetachieved[0].q4[0].nmap[0].a;

      this.totalTA.nhcTar += instUser.targetachieved[0].q1[0].nhc[0].t + 
        instUser.targetachieved[0].q2[0].nhc[0].t +
        instUser.targetachieved[0].q3[0].nhc[0].t +
        instUser.targetachieved[0].q4[0].nhc[0].t;
      this.totalTA.nhcAch += instUser.targetachieved[0].q1[0].nhc[0].a + 
        instUser.targetachieved[0].q2[0].nhc[0].a +
        instUser.targetachieved[0].q3[0].nhc[0].a +
        instUser.targetachieved[0].q4[0].nhc[0].a;

        this.totalTA.ohsTar += instUser.targetachieved[0].q1[0].ohs[0].t + 
        instUser.targetachieved[0].q2[0].ohs[0].t +
        instUser.targetachieved[0].q3[0].ohs[0].t +
        instUser.targetachieved[0].q4[0].ohs[0].t;
      this.totalTA.ohsAch += instUser.targetachieved[0].q1[0].ohs[0].a + 
        instUser.targetachieved[0].q2[0].ohs[0].a +
        instUser.targetachieved[0].q3[0].ohs[0].a +
        instUser.targetachieved[0].q4[0].ohs[0].a;

    })
  }
}
