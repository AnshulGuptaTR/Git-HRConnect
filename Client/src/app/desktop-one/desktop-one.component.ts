import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'desktop-one',
  templateUrl: './desktop-one.component.html',
  styleUrls: ['./desktop-one.component.css'],
})
export class DesktopOneComponent implements OnInit {
  employeeDetails = [
    { title: 'EMP Name', value: '', code: 'empname' },
    { title: 'Gender', value: '', code: 'gender' },
    { title: 'Grade', value: '', code: 'grade' },
    { title: 'Title', value: '', code: 'title' },
    { title: 'M or IC', value: '', code: 'moric' },
    { title: 'Date of Joining', value: '', code: 'dateofjoining' },
    { title: 'HR Partner', value: '', code: 'hrpartner' },
    { title: 'BU', value: '', code: 'bu' },
  ];
  empId = '';

  collapseToggl = false;
  statisticsTable = false;
  detailForm: any;
  employeeGetSt = false;
  empIdSrc = '';
  engagementType = [
    { label: 'Stay Interviews', option: 1 },
    { label: 'Women Connect', option: 2 },
    // {label: "Skip", option: 3},
    // {label: "Top Talent Connect", option: 4},
    // {label: "NMAP", option: 5},
    // {label: "Policy Refresher Session", option: 6},
  ];
  engType = ['Stay Interviews', 'Women Connect'];
  connects = ['Connect 1', 'Connect 2', 'Connect 3'];
  reasonType = [
    { label: 'Reason', option: 1 },
    { label: 'Option2', option: 2 },
    { label: 'Option3', option: 3 },
    { label: 'Option4', option: 4 },
    { label: 'Option5', option: 5 },
    { label: 'Option6', option: 6 },
  ];
  completeempData: any[] = [];

  connectCount = 0;
  strCount = '0';
  eachconncount: any[] = [];
  setMeetingData: any[] = [];
  engStatistics = [
    { type: 'Stay Interviews', q1: 0, q2: 0, q3: 0, q4: 0 },
    { type: 'Women Connect', q1: 0, q2: 0, q3: 0, q4: 0 },
    // {type: "", count: 0},
    // {type: "", count: 0},
    // {type: "", count: 0},
    // {type: "", count: 0},
  ];
  gender = '';
  notValidId = false;
  formShowHide = true;
  appUserName: any;

  constructor(private http: HttpClient, private urlFormSub: FormBuilder) {
    this.detailForm = this.urlFormSub.group({
      Loggerempid: ['', [Validators.required]],
      empid: ['', [Validators.required]],
      engageType: [1],
      meetData: [''],
      reason: [1],
    });
  }

  ngOnInit(): void {
    this.setUserInfoFn();
  }

  searchEmp(empId: any) {
    // console.log(empId);
    const data = {
      emp_id: empId,
    };
    const headers = { 'content-type': 'application/json' };
    const b = JSON.stringify(data);
    let geturl = 'http://localhost:3000/trackergetdata/' + empId;

    this.http.post(geturl, b, { headers: headers }).subscribe(
      (response: any) => {
        console.log(response.length + 'count');
        localStorage.setItem('employee', JSON.stringify(response));
        this.employeeDetails.map((val: any) => {
          let temp = val.code;
          switch (temp) {
            case 'empname':
              val.value = response.empname;
              break;
            case 'grade':
              val.value = response.grade;
              break;
            case 'title':
              val.value = response.title;
              break;
            case 'moric':
              val.value = response.moric;
              break;
            case 'dateofjoining':
              val.value = response.dateofjoining;
              break;
            case 'hrpartner':
              val.value = response.hrpartner;
              break;
            case 'bu':
              val.value = response.bu;
              break;
            case 'gender':
              val.value = response.gender;
              break;
          }
        });
        this.empId = response.empid;
        this.gender = response.gender;
        this.employeeGetSt = true;
        this.completeempData = response.engagementType;
        this.setMeetingData = response.setMeetingData;
        if (this.completeempData != undefined) {
          this.enagementConnectCount(this.completeempData);
        };
        this.detailForm.controls.empid.setValue(this.empId);
        this.notValidId = false;
      },
      (error) => {
        this.notValidId = true;
        this.empIdSrc = '';
        this.employeeGetSt = false;
        this.employeeDetails.map((val: any) => {
          val.value = '';
        });
        this.completeempData = [];
        this.empId = '';
        this.statisticsTable = false;
        this.strCount = '0';
        if (this.completeempData != undefined) {
          this.enagementConnectCount(this.completeempData);
        }
        console.log(error.status + 'err');
      }
    );
  }

  ToggleFunction(togg: any, typeNo: number) {
    if (this.employeeGetSt) {
      this.collapseToggl = togg ? false : true;
      this.detailForm.controls.engageType.setValue(typeNo);
      this.detailForm.controls.empid.setValue(this.empId);
    }
  }

  closeSum() {
    this.collapseToggl = false;
    this.formShowHide = true;
  }

  engagementTable(statistic: any) {
    if (this.empId != '') {
      this.statisticsTable = statistic ? false : true;
    }
  }

  setMeeting(detailForm: any) {
    // this.collapseToggl = false;
    this.formShowHide = false;
    let formatData = this.formattingFormResult(detailForm);
    this.setMeetingData.push(formatData);
    console.log(this.completeempData[0][formatData.engageType].length);
    console.log('////');

    // let connections = ["Connect 1", "Connect 2", "Connect 3"];
    // if (this.completeempData[0][formatData.engageType][0]['Connect 1'] == '') {
    //   this.completeempData[0][formatData.engageType][0]['Connect 1'] = formatData.meetData;
    // } else if (this.completeempData[0][formatData.engageType][0]['Connect 2'] == '') {
    //   this.completeempData[0][formatData.engageType][0]['Connect 2'] = formatData.meetData;
    // } else if (this.completeempData[0][formatData.engageType][0]['Connect 3'] == '') {
    //   this.completeempData[0][formatData.engageType][0]['Connect 3'] = formatData.meetData;
    // }
    if (this.completeempData[0][formatData.engageType].length < 12) {
      this.completeempData[0][formatData.engageType].push(formatData.meetData);
    }
    this.enagementConnectCount(this.completeempData);
    const data = {
      track_id: this.empId,
      engagementType: this.completeempData,
      setMeetingData: this.setMeetingData,
    };
    const headers = { 'content-type': 'application/json' };
    const b = JSON.stringify(data);
    let updateurl = 'http://localhost:3000/trackerupdatedata/' + this.empId;
    // console.log(b);
    this.http
      .post(updateurl, b, { headers: headers })
      .subscribe((response: any) => {
        console.log(response);
      });

    this.detailForm = this.urlFormSub.group({
      Loggerempid: ['', [Validators.required]],
      empid: ['', [Validators.required]],
      engageType: [1],
      meetData: [''],
      reason: [1],
    });
  }

  formattingFormResult(detailForm: any) {
    let data = detailForm.value;
    // console.log(data);
    this.engagementType.map((val: any) => {
      // if (data.engageType == '1') {
      //   data.engageType = '1x1';
      // } else {
      if (val.option == data.engageType) {
        data.engageType = val.label;
      }
      // }
    });
    this.reasonType.map((val: any) => {
      if (val.option == data.reason) {
        data.reason = val.label;
      }
    });
    return data;
  }

  enagementConnectCount(completeempData: any) {
    let total = 0;
    this.engType.map((eng: any) => {
      total += completeempData[0][eng].length;

      // console.log(completeempData[0][eng]);
      let q1 = 0;
      let q2 = 0;
      let q3 = 0;
      let q4 = 0;
      completeempData[0][eng].map((val: any) => {
        let mon = new Date(val);
        const month = mon.toLocaleString('default', { month: 'short' });

        switch (month) {
          case 'Jan':
          case 'Feb':
          case 'Mar':
            q1++;
            break;
          case 'Apr':
          case 'May':
          case 'Jun':
            q2++;
            break;
          case 'Jul':
          case 'Aug':
          case 'Sep':
            q3++;
            break;
          case 'Oct':
          case 'Nov':
          case 'Dec':
            q4++;
            break;
        }
      });
      this.engStatistics.map((engS: any) => {
        if (engS.type == eng) {
          engS.q1 = q1;
          engS.q2 = q2;
          engS.q3 = q3;
          engS.q4 = q4;
        }
      });
    });
    console.log(this.engStatistics);
    this.strCount = total.toString();
    // this.connectCount = 0;
    // if (completeempData.length != 0) {
    //   this.engType.map((eng:any)=> {
    //     let eachConCount = 0;
    //     let arr: any[] = [];
    //     this.connects.map((con:any)=> {
    //       if (this.completeempData[0][eng][0][con] != '') {
    //         arr.push(this.completeempData[0][eng][0][con]);
    //         this.connectCount++;
    //         eachConCount++;
    //       }
    //     });
    //     this.eachconncount[eng] = arr;
    //   });
    //   this.strCount = this.connectCount.toString();
    // }
    // console.log(this.eachconncount);
    // this.engStatistics.map((val:any)=>{
    //   val.count = this.eachconncount[val.type].length;
    // })
  }

  setUserInfoFn() {
    this.appUserName = localStorage.getItem("userDetails");
    let val = JSON.parse(this.appUserName);
    this.appUserName = val.username;
  }
}
