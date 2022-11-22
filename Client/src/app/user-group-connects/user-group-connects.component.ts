import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalServiceService } from '../service/global-service.service';

@Component({
  selector: 'app-user-group-connects',
  templateUrl: './user-group-connects.component.html',
  styleUrls: ['./user-group-connects.component.css']
})
export class UserGroupConnectsComponent implements OnInit {

  collapseToggl = false;
  engTypeSelect: any;
  statisticsTable = false;
  formShowHide = true;
  engagementType = [
    { label: 'Skip', option: 1 },
    { label: 'New Hire Connects', option: 2 },
    {label: "Open House Sessions", option: 3},
    {label: "NMAP", option: 4},
  ];
  statusMsg = false;
  statusMessage = '';
  
  skipForm: any;
  nmapForm: any;
  ohsForm: any;
  nhcForm: any;
  totalConnCoun = 0;

  grpusersData: any;
  strCount = '0';
  grpMetrix: any;

  loginUserDetails:any;
  appUserName: any;
  // grpMetrix = [{
  //   q1: [{
  //     skip: [{t: 4, a: 0}], nmap: [{t:4, a: 0}], ohs: [{t:4, a: 0}], nhc: [{t:4, a: 0}] 
  //   }],
  //   q2: [{
  //     skip: [{t: 4, a: 0}], nmap: [{t:4, a: 0}], ohs: [{t:4, a: 0}], nhc: [{t:4, a: 0}] 
  //   }],
  //   q3: [{
  //     skip: [{t: 4, a: 0}], nmap: [{t:4, a: 0}], ohs: [{t:4, a: 0}], nhc: [{t:4, a: 0}] 
  //   }],
  //   q4: [{
  //     skip: [{t: 4, a: 0}], nmap: [{t:4, a: 0}], ohs: [{t:4, a: 0}], nhc: [{t:4, a: 0}] 
  //   }]
  // }]

  constructor(private urlFormSub: FormBuilder, private globalService: GlobalServiceService, private http: HttpClient) {

    this.skipForm = this.urlFormSub.group({
      managerId: ['', [Validators.required]],
      // empid: ['', [Validators.required]],
      engageType: [1],
      meetData: ['', [Validators.required]],
      Feedback: [''],
      ManagerName: ['', [Validators.required]],
      bu: ['', [Validators.required]],
      Participants: ['', [Validators.required]],
      SkippySupervisorName: ['', [Validators.required]],
    });

    this.ohsForm = this.urlFormSub.group({
      teamName: ['', [Validators.required]],
      // empid: ['', [Validators.required]],
      ohsEngageType: [3],
      ohsmeetData: ['', [Validators.required]],
      ohsFeedback: [''],
      ohsbu: ['', [Validators.required]],
      ohsParticipants: ['', [Validators.required]],
    });

    this.nhcForm = this.urlFormSub.group({
      // empid: ['', [Validators.required]],
      nhcengageType: [2],
      nhcmeetData: ['', [Validators.required]],
      nhcFeedback: [''],
      nhcbu: ['', [Validators.required]],
      nhcParticipants: ['', [Validators.required]],
    });

   }

  get takeControl() {
    return this.skipForm.controls;
  }

  get ohstakeControl() {
    return this.ohsForm.controls;
  }

  get nhctakeControl() {
    return this.nhcForm.controls;
  }

  ngOnInit(): void {
    this.setUserInfoFn();
    this.getGrpUser();
    
  }

  getGrpUser() {
    this.loginUserDetails = localStorage.getItem("userDetails");
    let loginUser = JSON.parse(this.loginUserDetails);
    this.loginUserDetails = loginUser;
    const getdata = {
      username: this.loginUserDetails.username,
    }
    const headers1 = { 'content-type': 'application/json' }
    const b1 = JSON.stringify(getdata);
    let geturl = 'http://localhost:3000/hrbpgetdata/';
    this.http.post(geturl, b1, { 'headers': headers1 }).subscribe((response: any) => {
      this.grpusersData = response;
      this.totalConnectCount(response);
      this.grpMetrix = response.targetachieved;
    }, error => {
    });
  }
 
  ToggleFunction(togg: any, typeNo: number) {
    // if (this.employeeGetSt) {
    this.collapseToggl = togg ? false : true;
    if (typeNo == 1 || typeNo == 4) {
      this.skipForm.controls.engageType.setValue(typeNo);
      this.skipForm.controls.meetData.setValue('');
    }
    this.engTypeSelect = typeNo;
    
  }

  closeSum() {
    this.collapseToggl = false;
    this.formShowHide = true;
    this.statusMsg = false;
    this.statusMessage = '';
  }

  engagementTable(statistic: any) {
    // if (this.empId != '') {
    this.statisticsTable = statistic ? false : true;
    // }
  }
  
  setMeeting(formData:any, type:any) {
    this.formShowHide = false;
    this.statusMsg = true;
    this.statusMessage = 'Meeting has been added successfully.';
    var formatRes = this.formattingFormResult(formData);
    
    this.getQuarterly(formatRes, this.grpusersData);
    
    // this.globalService.grpInsertForm(formatRes,type, this.grpusersData);
    this.totalConnCoun++;
    this.strCount = this.totalConnCoun.toString();
  }
  
  formattingFormResult(detailForm: any) {
    let data = detailForm.value;
    this.engagementType.map((val: any) => {
      if (val.option == data.engageType) {
        data.engageType = val.label;
      } else if (val.option == data.ohsEngageType) {
        data.ohsEngageType = val.label;
      } else if (val.option == data.nhcengageType) {
        data.nhcengageType = val.label;
      }
    });
    
    return data;
  }

  totalConnectCount(response: any) {
    
      this.totalConnCoun = response.group[0]['Skip'].length + response.group[0]['New Hire Connects'].length + response.group[0]['Open House Sessions'].length + response.group[0]['NMAP'].length;
      this.strCount = this.totalConnCoun.toString();
      
  }
  
  getQuarterly(value:any, userData:any) {
    var meetDate;
    var quarter;
    var engType;
    switch (this.engTypeSelect) {
      case 1:
        meetDate = value.meetData
        quarter = this.findDateFinder(meetDate);
        engType = 'skip'
        break;
      case 2:
        meetDate = value.nhcmeetData
        quarter = this.findDateFinder(meetDate);
        engType = 'nhc'
        break;
      case 3:
        meetDate = value.ohsmeetData
        quarter = this.findDateFinder(meetDate);
        engType = 'ohs'
        break;
      case 4:
        meetDate = value.meetData
        quarter = this.findDateFinder(meetDate);
        engType = 'nmap'
        break;
    }

    switch (quarter) { 
      case 'q1':
        switch(engType) {
          case 'skip':
            this.grpusersData.targetachieved[0].q1[0].skip[0].a++;
            break;
          case 'nhc':
            this.grpusersData.targetachieved[0].q1[0].nhc[0].a++;
            break;
          case 'ohs':
            this.grpusersData.targetachieved[0].q1[0].ohs[0].a++;
            break;
          case 'nmap':
            this.grpusersData.targetachieved[0].q1[0].nmap[0].a++;
            break;
        }
        break;
      case 'q2':
        switch(engType) {
          case 'skip':
            this.grpusersData.targetachieved[0].q2[0].skip[0].a++;
            break;
          case 'nhc':
            this.grpusersData.targetachieved[0].q2[0].nhc[0].a++;
            break;
          case 'ohs':
            this.grpusersData.targetachieved[0].q2[0].ohs[0].a++;
            break;
          case 'nmap':
            this.grpusersData.targetachieved[0].q2[0].nmap[0].a++;
            break;
        }
        break;
      case 'q3':
        switch(engType) {
          case 'skip':
            this.grpusersData.targetachieved[0].q3[0].skip[0].a++;
            break;
          case 'nhc':
            this.grpusersData.targetachieved[0].q3[0].nhc[0].a++;
            break;
          case 'ohs':
            this.grpusersData.targetachieved[0].q3[0].ohs[0].a++;
            break;
          case 'nmap':
            this.grpusersData.targetachieved[0].q3[0].nmap[0].a++;
            break;
        }
        break;
      case 'q4':
        switch(engType) {
          case 'skip':
            this.grpusersData.targetachieved[0].q4[0].skip[0].a++;
            break;
          case 'nhc':
            this.grpusersData.targetachieved[0].q4[0].nhc[0].a++;
            break;
          case 'ohs':
            this.grpusersData.targetachieved[0].q4[0].ohs[0].a++;
            break;
          case 'nmap':
            this.grpusersData.targetachieved[0].q4[0].nmap[0].a++;
            break;
        }
        break;
    }

    console.log(engType);
    console.log(this.grpusersData);

    this.globalService.grpInsertForm(value,this.engTypeSelect, this.grpusersData);

    
  }

  findDateFinder(date:any) {
    let mon = new Date(date);
        const month = mon.toLocaleString('default', { month: 'short' });

        switch (month) {
          case 'Jan':
          case 'Feb':
          case 'Mar':
            return "q1";
          case 'Apr':
          case 'May':
          case 'Jun':
            return "q2";
          case 'Jul':
          case 'Aug':
          case 'Sep':
            return "q3";
          case 'Oct':
          case 'Nov':
          case 'Dec':
            return "q4";
        }
        return;
  }

  setUserInfoFn() {
    this.appUserName = localStorage.getItem("userDetails");
    let val = JSON.parse(this.appUserName);
    this.appUserName = val.username;
  }

}
