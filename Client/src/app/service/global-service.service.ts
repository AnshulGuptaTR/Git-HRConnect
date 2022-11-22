import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// export const globalVariables = {excelData: []};

@Injectable({
  providedIn: 'root'
})


export class GlobalServiceService {

  excelData: any;

  appUserName = '';

  constructor(private http: HttpClient) { }

  private groupPageFunc!: () => void;
  groupRenderFn(fn: () => void) {
    this.groupPageFunc = fn;
  }

  private renderManagingData!: () => void;
  onSomethingHappended(fn: () => void) {
    this.renderManagingData = fn;
    // from now on, call myFunc wherever you want inside this service
  }

  private adminLoginPageFunc!: () => void;
  adminLoginRenderFn(fn: () => void) {
    this.adminLoginPageFunc = fn;
  }

  private setUserFn!: () => void;
  setUserFnTrigger(fn: () => void) {
    this.setUserFn = fn;
  }


  getData() {
    const req = {
      "getData": 'true',
    };
    const body = JSON.stringify(req);
    const headers = { 'content-type': 'application/json' }

    // this.http.post('http://localhost:3000/getalldata', body, { 'headers': headers }).subscribe((response: any) => {

    this.http.post('http://localhost:3000/getalldata', body, { 'headers': headers }).subscribe((response: any) => {
      this.excelData = response;
      // localStorage.clear();
      localStorage.setItem('excelData', JSON.stringify(response));
      // this.renderManagingData();
      // globalVariables.excelData = this.excelData; 
      // console.log(this.excelData);
      // console.log(this.excelData);
      // location.reload();
      // this.importDbData(this.excelData);
     return this.excelData;
    });

    this.http.post('http://localhost:3000/getgrpdata', body, { 'headers': headers }).subscribe((response: any) => {
      this.excelData = response;
      localStorage.setItem('excelGrpData', JSON.stringify(response));
      // this.renderManagingData();
      // globalVariables.excelData = this.excelData; 
      // console.log(this.excelData);
      // console.log(this.excelData);
      // location.reload();
      // this.importDbData(this.excelData);
     return this.excelData;
    });
  }

    // method is to import employees details from excelsheet
    importDbData(excelData:any) {
      excelData.map((val:any)=>{
        const headers = { 'content-type': 'application/json' }
        // const data = {
        //   "empid": val.empId,
        //   "empname": val.empName,
        //   "grade": val.grade,
        //   "title": val.title,
        //   "moric": val.moric,
        //   "dateofjoining": val.dateOfJoining,
        //   "hrpartner": val.hrPartner,
        //   "bu": val.BU,
        //   "gender": val.gender,
        //   "recentrating": val.recentRating,
        //   "manager": val.manager,
        //   "engagementType": val.engagementType,
        //   "feedbackComments": val.feedbackComments,
        //   "newHireStatus": val.newHireStatus
        // }

        const data = {
          "username": val.username,
          "userstatus": val.userstatus,
          "reportingtosuperuser": val.reportingtosuperuser,
          "superuserstatus": val.superuserstatus,
          "reportingtosupersuperuser": val.reportingtosupersuperuser,
          "supersuperuserstatus": val.supersuperuserstatus,
          "admin": val.admin,
          "targetachieved": val.targetachieved,
          "oneonone": val.oneonone,
          "group": val.group
        }

        const b = JSON.stringify(data);
        // this.http.post('http://localhost:3000/importDataBase', b, { 'headers': headers }).subscribe((response: any) => {
        this.http.post('http://localhost:3000/importGrpDB', b, { 'headers': headers }).subscribe((response: any) => {
            console.log(response);
          });
      })
    }

    setEmployeeConnects(empData:any, formatData:any, setMeetingData:any) {
      console.log('yes');
      empData.engagementType[0][formatData.engageType][0] = {date: formatData.meetData, ack: 0};
      console.log(empData.engagementType);
      const data = {
        track_id: empData.empid,
        engagementType: empData.engagementType,
        setMeetingData: setMeetingData,
      };
      const headers = { 'content-type': 'application/json' };
      const b = JSON.stringify(data);
      let updateurl = 'http://localhost:3000/trackerupdatedata/' + empData.empid;
      this.http
        .post(updateurl, b, { headers: headers })
        .subscribe((response: any) => {
          console.log(response);
        });
    }

    setEmployeeConnectsAck(empData:any, type:any) {
      // empData.engagementType[0][type][0].map((eng:any)=>{
      //   eng.ack = 1;
      // })
      empData.engagementType[0][type][0].ack = 1;
      console.log(empData.empid);
      console.log(empData.engagementType);


      //Acknowledging status for eng type
      const data = {
        track_id: empData.empid,
        engagementType: empData.engagementType,
        setMeetingData: '',
      };
      const headers = { 'content-type': 'application/json' };
      const b = JSON.stringify(data);
      let updateurl = 'http://localhost:3000/trackerupdatedata/' + empData.empid;
      this.http
        .post(updateurl, b, { headers: headers })
        .subscribe((response: any) => {
          console.log(response);
        });


      const data1 = {
        track_id: empData.empid,
        newHireStatus: 0,
      };
      const header = { 'content-type': 'application/json' };
      const bd = JSON.stringify(data1);
      let updateurls = 'http://localhost:3000/updatenewhire/' + empData.empid;
      this.http
        .post(updateurls, bd, { headers: header })
        .subscribe((response: any) => {
          console.log(response);
        });
    }


    grpInsertForm(formData:any, type:any, userData:any) {
      var dataInsert;
      switch(type) {
        case 1:
          userData.group[0]['Skip'].push(formData);
          
          break;
        case 2:
          userData.group[0]['New Hire Connects'].push(formData);
          
          break;
        case 3:
          dataInsert = userData.group[0]['Open House Sessions'].push(formData);
         
          break;
          case 4:
          dataInsert = userData.group[0]['NMAP'].push(formData);
          break;
        }
        dataInsert = userData.group;
      
      console.log(dataInsert) ;
      const data = {
        username: userData.username,
        group: dataInsert,
        targetachieved: userData.targetachieved
      };
      const headers = { 'content-type': 'application/json' };
      const b = JSON.stringify(data);
      let updateurl = 'http://localhost:3000/grptrackerupdate/';
      this.http
        .post(updateurl, b, { headers: headers })
        .subscribe((response: any) => {
          console.log(response);
        });
    }


    /*AdminDetails*/
    getAdminDetails(adminName:any) {
      this.appUserName = adminName;
      const getdata = {
        username: adminName,
      }
      const headers = { 'content-type': 'application/json' }
      const b = JSON.stringify(getdata);
      let geturl = 'http://localhost:3000/hrbpgetdata/';
      this.http.post(geturl, b, { 'headers': headers }).subscribe((response: any) => {
        localStorage.setItem('userDetails', JSON.stringify(response));
        this.adminLoginPageFunc();
        // console.log(response);
        return response;
      }, error => {
        return -1;
      });
    }

    /* Get User */
    getUserDetails(adminName:any) {
      const getdata = {
        username: adminName,
      }
      const headers = { 'content-type': 'application/json' }
      const b = JSON.stringify(getdata);
      let geturl = 'http://localhost:3000/hrbpgetdata/';
      this.http.post(geturl, b, { 'headers': headers }).subscribe((response: any) => {
        // console.log(response);
        localStorage.setItem('chosenuserAdmin', JSON.stringify(response));
        this.setUserFn();
        return response;
      }, error => {
        return -1;
      });
    }

    setTargetAdmin(userName:any, tarAchieve: any) {
      const data = {
        username: userName,
        targetachieved: tarAchieve
      };
      const headers = { 'content-type': 'application/json' };
      const b = JSON.stringify(data);
      let updateurl = 'http://localhost:3000/admin-target-update/';
      this.http
        .post(updateurl, b, { headers: headers })
        .subscribe((response: any) => {
          console.log(response);
        });
    }
}
