import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalServiceService } from '../service/global-service.service';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  // employeeDetails = [
  //   { title: 'Bala Devaraj', value: '', code: '' },
  //   { title: 'Arul Raj', value: '', code: '' },
  //   { title: 'Chayanika Dwivedi', value: '', code: '' },
  //   { title: 'Anshul Gupta', value: '', code: '' },
  //   // { title: 'M or IC', value: '', code: 'moric' },
  //   // { title: 'Date of Joining', value: '', code: 'dateofjoining' },
  //   // { title: 'HR Partner', value: '', code: 'hrpartner' },
  //   // { title: 'BU', value: '', code: 'bu' },
  // ];
  employeeDetails = [
    { title: 'Bala Devaraj', value: '100' },
    { title: 'Arul Raj', value: '45' },
    { title: 'Chayanika Dwivedi', value: '25' },
    { title: 'Anshul Gupta', value: '30' },
  ];
  excelData: any;
  managerCount = [
    { manager: 'Bala Devaraj', value: 0, emp:[], newHire: []}
  ];
  empId = '';

  collapseToggl = false;
  statisticsTable = false;
  detailForm: any;
  employeeGetSt = false;
  empIdSrc = '';
  engagementType = [
    { label: 'Skip', option: 1 },
    { label: 'New Hire Connects', option: 2 },
    {label: "Open House Sessions", option: 3},
    {label: "Monthly Manager Connect", option: 4},
    {label: "Focus Group", option: 5},
    {label: "NMAP", option: 6},
    // {label: "Policy Refresher Session", option: 6},
  ];
  engType = [
    '1x1',
    'NMAP',
    'Policy Refresher Session',
    'Skip',
    'Top Talent Connect',
    'Women Connect',
  ];
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
  newHireCount = 0;
  newHireEmp: any[] = [];
  formShowHide = true;
  minDate = '';
  maxDate = '';
  newhireDate: any[] = [];
  nhDate = '';
  showMe: boolean = false;

  notification = 0;
  notificationList: any[] = [];
  authStatus = false;
  engTypeSelect: any;
  statusMsg = false;
  statusMessage = '';

  
  


  constructor(private http: HttpClient, private urlFormSub: FormBuilder, private globeServe: GlobalServiceService) {
    this.detailForm = this.urlFormSub.group({
      Loggerempid: ['', [Validators.required]],
      // empid: ['', [Validators.required]],
      engageType: [1],
      meetData: ['', [Validators.required]],
      reason: [1],
    });
  }
  
  get takeControl() {
    // console.log(this.detailForm.controls);
    return this.detailForm.controls;
  }

  ngOnInit(): void {
    // this.globeServe.groupRenderFn(this.renderManagingData.bind(this));
    // this.renderManagingData();
    this.globeServe.onSomethingHappended(this.renderManagingData.bind(this));
  }
  
  ngAfterViewInit() {
    // this.globeServe.getData();
  }

  renderManagingData() {
    console.log('tets');
    this.excelData = localStorage.getItem("excelData");
    let excelData = JSON.parse(this.excelData);
    excelData.map((emp:any) => {
      if (emp.moric == "M") {
        this.managerCount.push({manager: emp.empname, value: 0, emp: [], newHire: []})
      }
    })
    this.managerCount.map((manage:any) => {
      let count = 0;
      excelData.map((emp:any) => {
        if (manage.manager == emp.manager) {
          manage.emp.push(emp);
          if (emp.newHireStatus == 1) {
            manage.newHire.push(emp);
            this.newHireCount++;
          }
          count++;
        }
      })
      manage.value = count;
      if (manage.newHire.length != '') {
        this.newhireDate.push({manager: manage.manager, connect: manage.newHire})
      }
    })
    if (this.newHireCount > 0) {
      this.notification++;
      this.notificationList.push({msg: "We have " + this.newHireCount  + " new hire. Please set the New Hire Connect."});
    }
    // console.log(this.newhireDate);
  }

  ToggleFunction(togg: any, typeNo: number) {
    // if (this.employeeGetSt) {
    this.collapseToggl = togg ? false : true;
    this.detailForm.controls.engageType.setValue(typeNo);
    this.detailForm.controls.meetData.setValue('');
    this.detailForm.controls.Loggerempid.setValue('');
    this.engTypeSelect = typeNo;
    // this.detailForm.controls.empid.setValue(this.empId);
    // }
    
    
    
    if (typeNo == 2) {  
      let ack = 1;
      this.newhireDate.map((nHdate:any)=>{
          nHdate.connect.map((nHd:any)=>{
            if (nHd.engagementType[0]["New Hire Connects"].length != 0) {
              this.nhDate = nHd.engagementType[0]["New Hire Connects"][0].date;
              ack = nHd.engagementType[0]["New Hire Connects"][0].ack;
            }
            // console.log(nHd.engagementType[0]["New Hire Connects"].length)
          });
        
      })
      if (this.nhDate != '' && ack == 0) {
        console.log(this.newhireDate);
        this.authStatus = true;
      }
      let myDate = new Date();
      var todate = myDate.getDate();
      var currentMonth = myDate.getMonth() + 1;
      var nextMonth = myDate.getMonth() + 2;
      
        if (  todate <= 15 ) {
          if (currentMonth > 0 && currentMonth <= 9) { 
            this.minDate = myDate.getFullYear()+'-0'+currentMonth+'-01';
            this.maxDate = myDate.getFullYear()+'-0'+currentMonth+'-15';
          } else {
            this.minDate = myDate.getFullYear()+'-'+currentMonth+'-01';
            this.maxDate = myDate.getFullYear()+'-'+currentMonth+'-15';
          }
        } else {
          if (currentMonth > 0 && currentMonth <= 9) { 
            this.minDate = myDate.getFullYear()+'-0'+nextMonth+'-01';
            this.maxDate = myDate.getFullYear()+'-0'+nextMonth+'-15';
          } else {
            this.minDate = myDate.getFullYear()+'-'+nextMonth+'-01';
            this.maxDate = myDate.getFullYear()+'-'+nextMonth+'-15';
          }
        }
        // console.log(this.minDate);
        // console.log(this.maxDate);
    }
  }

  toogleNotification() {
    this.showMe = !this.showMe;
    this.notification = 0;
  }

  closeSum() {
    this.collapseToggl = false;
    this.formShowHide = true;

    this.minDate = '';
    this.maxDate = '';
    this.statusMsg = false;
    this.statusMessage = '';

    this.detailForm = this.urlFormSub.group({
      Loggerempid: ['', [Validators.required]],
      // empid: ['', [Validators.required]],
      engageType: [1],
      meetData: ['', [Validators.required]],
      reason: [1],
    });

  }

  engagementTable(statistic: any) {
    // if (this.empId != '') {
    this.statisticsTable = statistic ? false : true;
    // }
  }

  setMeeting(detailForm: any) {
    // this.collapseToggl = false;
    this.formShowHide = false;
    let formatData = this.formattingFormResult(detailForm);
    this.setMeetingData.push(formatData);
    // console.log(formatData);

    // if (this.completeempData[0][formatData.engageType].length < 12) {
    //   this.completeempData[0][formatData.engageType].push(formatData.meetData);
    // }
    // this.enagementConnectCount(this.completeempData);

    this.managerCount.map((item:any)=>{
      if (item.newHire.length > 0) {
        item.newHire.map((h:any)=>{
          this.globeServe.setEmployeeConnects(h,formatData,this.setMeetingData)
        })
      }
    })
    
    this.notificationList.unshift({msg: "New hire meeting has been schedule for "+ formatData.meetData});
    this.notification++;

    this.detailForm = this.urlFormSub.group({
      Loggerempid: ['', [Validators.required]],
      empid: ['', [Validators.required]],
      engageType: [1],
      meetData: [''],
      reason: [1],
    });

    this.statusMsg = true;
    this.statusMessage = 'Meeting has been added successfully.';
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

  ackFn(status:any) {
    var type: any;
    this.engagementType.map((v:any)=>{
      if (v.option == this.engTypeSelect) {
        type = v.label
      }
    })
    
    if (status == 1) {
      this.managerCount.map((item:any) => {
        if (item.newHire.length > 0) {
          item.newHire.map((h:any) => {
            this.globeServe.setEmployeeConnectsAck(h, type);
          })
        }
      })
      this.authStatus = false;
      this.formShowHide = false;
      this.statusMsg = true;
      this.statusMessage = 'Acknowledgement has been updated successfully.';
      // location.reload();
      this.newHireCount = 0;
      
    } else {

      this.authStatus = false;
      this.formShowHide = true;

    }
  }

  // enagementConnectCount(completeempData: any) {
  //   this.connectCount = 0;
  //   if (completeempData.length != 0) {
  //     this.engType.map((eng: any) => {
  //       let eachConCount = 0;
  //       let arr: any[] = [];
  //       this.connects.map((con: any) => {
  //         if (this.completeempData[0][eng][0][con] != '') {
  //           arr.push(this.completeempData[0][eng][0][con]);
  //           this.connectCount++;
  //           eachConCount++;
  //         }
  //       });
  //       this.eachconncount[eng] = arr;
  //     });
  //   }
  //   console.log(this.eachconncount);
  //   this.engStatistics.map((val: any) => {
  //     val.count = this.eachconncount[val.type].length;
  //   });
  // }
}
