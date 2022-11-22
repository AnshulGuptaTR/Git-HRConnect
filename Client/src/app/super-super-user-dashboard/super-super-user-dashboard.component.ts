import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-super-super-user-dashboard',
  templateUrl: './super-super-user-dashboard.component.html',
  styleUrls: ['./super-super-user-dashboard.component.css']
})
export class SuperSuperUserDashboardComponent implements OnInit {

  appUserName: any;
  supUsersData:any;
  userMetrix:any;
  supUserUnderSh:any;
  selectedSpecUserName:any;
  TabTogg = false;
  overTabTogg = false;
  totalTA:any;
  overAllData:any;

  constructor() { }

  ngOnInit(): void {
    this.setUserInfoFn();
    this.getSupUser();
  }

  setUserInfoFn() {
    this.appUserName = localStorage.getItem("userDetails");
    let val = JSON.parse(this.appUserName);
    this.appUserName = val.username;
  }

  getSupUser() {
    this.supUsersData = localStorage.getItem("excelGrpData");
    let val = JSON.parse(this.supUsersData);
    this.supUserUnderSh = val;
    this.supUsersData = val.filter((match:any) => match.superuserstatus == 1 || (match.reportingtosuperuser == "" && match.supersuperuserstatus == 0 &&  match.superuserstatus == 0));
  }

  getSpecificDetails(userData:any) {
    this.TabTogg = true;
    this.overTabTogg = false;
    this.userMetrix = this.supUserUnderSh.filter((match:any) => match.reportingtosuperuser == userData);
    this.selectedSpecUserName = userData;
    if (this.userMetrix.length == 0) {
      this.userMetrix = this.supUserUnderSh.filter((match:any) => match.username == userData);
    }
    this.totalFn();
    console.log(this.userMetrix);
    
  }

  totalFn() {
    this.totalTA = {"skipTar": 0, "skipAch": 0, "nmapTar": 0, "nmapAch": 0, "nhcTar": 0, "nhcAch": 0, "ohsTar": 0, "ohsAch": 0};
    this.userMetrix.map((instUser:any)=> {
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

  overAll() {
    this.TabTogg = false;
    this.overTabTogg = true;
    this.overAllData = [];
    this.supUsersData.map((supUs:any)=>{
      var tot = {"skipTar": 0, "skipAch": 0, "nmapTar": 0, "nmapAch": 0, "nhcTar": 0, "nhcAch": 0, "ohsTar": 0, "ohsAch": 0};
      this.supUserUnderSh.map((allUser:any)=>{
        if (supUs.username == allUser.reportingtosuperuser || (allUser.reportingtosuperuser == "" && allUser.supersuperuserstatus == 0 &&  allUser.superuserstatus == 0 && supUs.username == allUser.username)) {
          console.log(allUser.username);
          tot.skipTar += allUser.targetachieved[0].q1[0].skip[0].t + 
              allUser.targetachieved[0].q2[0].skip[0].t +
              allUser.targetachieved[0].q3[0].skip[0].t +
              allUser.targetachieved[0].q4[0].skip[0].t;
          tot.skipAch += allUser.targetachieved[0].q1[0].skip[0].a + 
                allUser.targetachieved[0].q2[0].skip[0].a +
                allUser.targetachieved[0].q3[0].skip[0].a +
                allUser.targetachieved[0].q4[0].skip[0].a;

          tot.nmapTar += allUser.targetachieved[0].q1[0].nmap[0].t + 
                allUser.targetachieved[0].q2[0].nmap[0].t +
                allUser.targetachieved[0].q3[0].nmap[0].t +
                allUser.targetachieved[0].q4[0].nmap[0].t;
          tot.nmapAch += allUser.targetachieved[0].q1[0].nmap[0].a + 
                allUser.targetachieved[0].q2[0].nmap[0].a +
                allUser.targetachieved[0].q3[0].nmap[0].a +
                allUser.targetachieved[0].q4[0].nmap[0].a;

          tot.nhcTar += allUser.targetachieved[0].q1[0].nhc[0].t + 
                allUser.targetachieved[0].q2[0].nhc[0].t +
                allUser.targetachieved[0].q3[0].nhc[0].t +
                allUser.targetachieved[0].q4[0].nhc[0].t;
          tot.nhcAch += allUser.targetachieved[0].q1[0].nhc[0].a + 
                allUser.targetachieved[0].q2[0].nhc[0].a +
                allUser.targetachieved[0].q3[0].nhc[0].a +
                allUser.targetachieved[0].q4[0].nhc[0].a;

          tot.ohsTar += allUser.targetachieved[0].q1[0].ohs[0].t + 
                allUser.targetachieved[0].q2[0].ohs[0].t +
                allUser.targetachieved[0].q3[0].ohs[0].t +
                allUser.targetachieved[0].q4[0].ohs[0].t;
          tot.ohsAch += allUser.targetachieved[0].q1[0].ohs[0].a + 
                allUser.targetachieved[0].q2[0].ohs[0].a +
                allUser.targetachieved[0].q3[0].ohs[0].a +
                allUser.targetachieved[0].q4[0].ohs[0].a;
        }
      })

      this.overAllData.push({username:supUs.username, total:tot});
    })

    // console.log(this.overAllData);
    var total = {"skipTar": 0, "skipAch": 0, "nmapTar": 0, "nmapAch": 0, "nhcTar": 0, "nhcAch": 0, "ohsTar": 0, "ohsAch": 0};
    this.overAllData.map((totalOv:any)=>{
      total.skipTar += totalOv.total.skipTar;
      total.skipAch += totalOv.total.skipAch;
      total.nmapTar += totalOv.total.nmapTar;
      total.nmapAch += totalOv.total.nmapAch;
      total.nhcTar += totalOv.total.nhcTar;
      total.nhcAch += totalOv.total.nhcAch;
      total.ohsTar += totalOv.total.ohsTar;
      total.ohsAch += totalOv.total.ohsAch;
    })
    this.overAllData.push({username:"Total", total:total});

    console.log(total);
  }

}
