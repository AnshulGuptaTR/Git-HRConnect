import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalServiceService } from '../service/global-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  
  employeeDetails = [];
  empId = '';

  collapseToggl = false;
  statisticsTable = false;
  detailForm: any;
  employeeGetSt = false;
  empIdSrc = '';
  engagementType = [
    { label: 'Skip', option: 1 },
    { label: 'NMAP', option: 2 },
    { label: 'New Hire Connects', option: 3 },
    { label: 'Open House Sessions', option: 4 }
  ];
  engType = [
    'Skip',
    'NMAP',
    'New Hire Connects',
    'Open House Sessions'
  ];
  completeempData: any[] = [];

  connectCount = 0;
  eachconncount: any[] = [];
  setMeetingData: any[] = [];
  engStatistics = [
    { type: '1x1', count: 0 },
    { type: 'Skip', count: 0 },
    { type: 'Women Connect', count: 0 },
    { type: 'NMAP', count: 0 },
    { type: 'Top Talent Connect', count: 0 },
    { type: 'Policy Refresher Session', count: 0 },
  ];
  userDetails: any;
  goalAccessBtn = false;
  selectedUser: any;
  popusername = '';
  formText = "Set Goals";
  formEditStatus = false;
  formShowHide = true;
  totalConnCoun = 0;
  strCount = '0';
  grpMetrix: any;
  appUserName: any;


  constructor(private http: HttpClient, private urlFormSub: FormBuilder, private globalService: GlobalServiceService) {
    this.detailForm = this.urlFormSub.group({
      engageType: [1],
      q1: [0],
      q2: [0],
      q3: [0],
      q4: [0],
    });
  }

  ngOnInit(): void {
    this.setUserInfoFn();
    this.userDetails = localStorage.getItem("excelGrpData");
    let userVal = JSON.parse(this.userDetails);
    this.userDetails = userVal.filter((match: any) => match.userstatus == 1);
    this.userDetails = this.userDetails.sort(this.sorter('username'));
    // this.getUserName(userVal);
    this.globalService.setUserFnTrigger(this.setUserData.bind(this))
  }

  sorter = (sortBy: string) => (a: { [x: string]: { toLowerCase: () => number; }; }, b: { [x: string]: { toLowerCase: () => number; }; }) => a[sortBy].toLowerCase() > b[sortBy].toLowerCase() ? 1 : -1;

  get takeControl() {
    return this.detailForm.controls;
  }

  ToggleFunction(togg: any, typeNo: number) {
    // if (this.employeeGetSt) {
    this.collapseToggl = togg ? false : true;
    this.selectFn('1');
    this.detailForm.controls.engageType.setValue(1);
    // this.detailForm.controls.engageType.setValue(typeNo);
    // this.detailForm.controls.empid.setValue(this.empId);
    // }
  }

  closeSum() {
    this.collapseToggl = false;
    this.formShowHide = true;
    this.detailForm.controls.engageType.setValue(1);
  }

  engagementTable(statistic: any) {
    // if (this.empId != '') {
    this.statisticsTable = statistic ? false : true;
    // }
  }

  setMeeting(detailForm: any) {
    // this.collapseToggl = false;
    this.updatedSelectUser(detailForm.value);
    // if (this.formEditStatus) {
    //   if (confirm("Are you sure? You want to update the previous targets?")) {
    //     console.log("Yes");
    //     this.globalService.setTargetAdmin(this.popusername, this.selectedUser.targetachieved);
    //     alert("Target is updated successfully");
    //   } else {
    //     alert("Target is not updated successfully");
    //     console.log("No");
    //   }
    // } else {
    //   console.log("Set Goals");
    // }
    this.globalService.setTargetAdmin(this.popusername, this.selectedUser.targetachieved);
    this.formShowHide = false;

    // console.log(detailForm.value);
    
  }

  getSpecificDetails(userData:any) {
    this.goalAccessBtn = true;
    this.statisticsTable = false;
    this.globalService.getUserDetails(userData);
    
  }

  setUserData() {
    this.selectedUser = localStorage.getItem("chosenuserAdmin");
    let val = JSON.parse(this.selectedUser);
    this.selectedUser = val;
    this.popusername = this.selectedUser.username;
    this.totalConnectCount(this.selectedUser);
    this.grpMetrix = this.selectedUser.targetachieved
  }

  selectFn(v:any) {
    let q1 = 0,q2 = 0,q3 = 0, q4 = 0;

    switch(v) {
      case "1":
        q1 = this.selectedUser.targetachieved[0].q1[0].skip[0].t;
        q2 = this.selectedUser.targetachieved[0].q2[0].skip[0].t;
        q3 = this.selectedUser.targetachieved[0].q3[0].skip[0].t;
        q4 = this.selectedUser.targetachieved[0].q4[0].skip[0].t;
        break;
      case "2":
        q1 = this.selectedUser.targetachieved[0].q1[0].nmap[0].t;
        q2 = this.selectedUser.targetachieved[0].q2[0].nmap[0].t;
        q3 = this.selectedUser.targetachieved[0].q3[0].nmap[0].t;
        q4 = this.selectedUser.targetachieved[0].q4[0].nmap[0].t;
        break;
      case "3":
        q1 = this.selectedUser.targetachieved[0].q1[0].nhc[0].t;
        q2 = this.selectedUser.targetachieved[0].q2[0].nhc[0].t;
        q3 = this.selectedUser.targetachieved[0].q3[0].nhc[0].t;
        q4 = this.selectedUser.targetachieved[0].q4[0].nhc[0].t;
        break;
      case "4":
        q1 = this.selectedUser.targetachieved[0].q1[0].ohs[0].t;
        q2 = this.selectedUser.targetachieved[0].q2[0].ohs[0].t;
        q3 = this.selectedUser.targetachieved[0].q3[0].ohs[0].t;
        q4 = this.selectedUser.targetachieved[0].q4[0].ohs[0].t;
        break;
    }

    this.detailForm.controls.q1.setValue(q1);
    this.detailForm.controls.q2.setValue(q2);
    this.detailForm.controls.q3.setValue(q3);
    this.detailForm.controls.q4.setValue(q4);

    if (q1 > 0 || q2 > 0 || q3 > 0 || q4 > 0) {
      this.formText = "Edit Goals";
      this.formEditStatus = true;
    } else {
      this.formText = "Set Goals";
      this.formEditStatus = false;
    }

  }

  updatedSelectUser(submitData:any) {
    console.log(typeof submitData.engageType);
    switch(submitData.engageType) {
      case '1':
        console.log('skip');
        this.selectedUser.targetachieved[0].q1[0].skip[0].t = submitData.q1;
        this.selectedUser.targetachieved[0].q2[0].skip[0].t = submitData.q2;
        this.selectedUser.targetachieved[0].q3[0].skip[0].t = submitData.q3;
        this.selectedUser.targetachieved[0].q4[0].skip[0].t = submitData.q4;
        break;
        case '2':
        console.log('nmap');
        this.selectedUser.targetachieved[0].q1[0].nmap[0].t = submitData.q1;
        this.selectedUser.targetachieved[0].q2[0].nmap[0].t = submitData.q2;
        this.selectedUser.targetachieved[0].q3[0].nmap[0].t = submitData.q3;
        this.selectedUser.targetachieved[0].q4[0].nmap[0].t = submitData.q4;
        break;
      case '3':
        console.log('nhc');
        this.selectedUser.targetachieved[0].q1[0].nhc[0].t = submitData.q1;
        this.selectedUser.targetachieved[0].q2[0].nhc[0].t = submitData.q2;
        this.selectedUser.targetachieved[0].q3[0].nhc[0].t = submitData.q3;
        this.selectedUser.targetachieved[0].q4[0].nhc[0].t = submitData.q4;
        break;
      case '4':
        console.log('ohs');
        this.selectedUser.targetachieved[0].q1[0].ohs[0].t = submitData.q1;
        this.selectedUser.targetachieved[0].q2[0].ohs[0].t = submitData.q2;
        this.selectedUser.targetachieved[0].q3[0].ohs[0].t = submitData.q3;
        this.selectedUser.targetachieved[0].q4[0].ohs[0].t = submitData.q4;
        break;
    }
    console.log(this.selectedUser.targetachieved);
  }

  totalConnectCount(response: any) {
    this.totalConnCoun = response.group[0]['Skip'].length + response.group[0]['New Hire Connects'].length + response.group[0]['Open House Sessions'].length + response.group[0]['NMAP'].length;
    this.strCount = this.totalConnCoun.toString();
    
}

  setUserInfoFn() {
    this.appUserName = localStorage.getItem("userDetails");
    let val = JSON.parse(this.appUserName);
    this.appUserName = val.username;
  }

  // getUserName(userData:any) {
  //   this.userDetails = [];
  //   userData.map((val:any) => {
      
  //   })
  // }
}
