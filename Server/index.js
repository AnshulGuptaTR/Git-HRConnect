const db = require('./_helpers/db');
const dbGrp = require('./_helpers/dbGrp');

const express = require('express');
const { getEnvironmentData } = require('worker_threads');
const app = express()
const port = 3000
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());
const router = express.Router();
app.use('/', router);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/importDataBase', require('./HrTrackerDB/hrtracker.controller'));
app.use('/trackergetdata/:id', require('./HrTrackerDB/getData.controller'));
app.use('/trackerupdatedata/:id', require('./HrTrackerDB/updateData.controller'));
app.use('/updatenewhire/:id', require('./HrTrackerDB/updatenewhire.controller'));

app.use('/importGrpDB', require('./groupData/grphrtracker.controller'));
app.use('/hrbpgetdata', require('./groupData/getData.controller'));
app.use('/grptrackerupdate', require('./groupData/updateGrpData.controller'));

/* Admin Link */
app.use('/admin-target-update', require('./adminDB/adminUpdateTar.controller'));



app.post('/getalldata', (req, res) => {
  const test = db.tracker.find().then((result)=>{
    res.send(JSON.stringify(result));
  });
});

app.post('/getgrpdata', (req, res) => {
  const test = dbGrp.hrbpdatasheet.find().then((result)=>{
    res.send(JSON.stringify(result));
  });
});

app.post('/getdata', (req, res) => {
    console.log('getdata entered');

    const reader = require('xlsx')
  
    const readOpts = {
      cellText:false, 
      cellDates:true
    };

    // const file = reader.readFile('./excelfile/HR-engagement-tracker-automation.xlsx',  readOpts);
    const file = reader.readFile('./excelfile/HR-engagement-tracker-automation3.xlsx',  readOpts);

    const sheets = file.SheetNames

    const jsonOpts = {
      header: 1,
      defval: '',
      blankrows: true,
      raw: false,
      dateNF: 'd"/"m"/"yyyy'
    }
    
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]], jsonOpts)
    let head = [];
    head = temp[0];
    let subHead = [];
    console.log(temp.length);
    subHead = temp[1];
    result = [];
    temp.map((val, i) => {

      if (i > 1) {
        var engagementType = [{
          // '1x1': [{
          //   "Connect 1": val[10],
          //   "Connect 2": val[11],
          //   "Connect 3": val[12]
          // }],
          // 'Policy Refresher Session': [{
            //   "Connect 1": val[16],
            //   "Connect 2": val[17],
            //   "Connect 3": val[18]
            // }],
            // 'NMAP': [],
          // 'Top Talent Connect': [{
            //   "Connect 1": val[22],
            //   "Connect 2": val[23],
            //   "Connect 3": val[24]
            // }],
            'Stay Interviews': [],
            'Women Connect': [],
            'Skip': [],
            'New Hire Connects': []
        }]
        result.push({
          "empId": val[0],
          "empName": val[1],
          "grade": val[2],
          "title": val[3],
          "moric": val[4],
          "dateOfJoining": val[5],
          "hrPartner": val[6],
          "BU": val[7],
          "gender": val[8],
          "recentRating": val[9],
          "manager": val[10],
          "engagementType": engagementType,
          "feedbackComments": val[30],
          "newHireStatus": val[29]
        })
      }
    })
    console.log(result);
    res.send(JSON.stringify(result));
});


app.post('/gethrbpdata', (req, res) => {
  console.log('getdata entered');

  const reader = require('xlsx')

  const readOpts = {
    cellText:false, 
    cellDates:true
  };

  // const file = reader.readFile('./excelfile/HR-engagement-tracker-automation.xlsx',  readOpts);
  const file = reader.readFile('./excelfile/HRBP-Datasheet.xlsx',  readOpts);

  const sheets = file.SheetNames

  const jsonOpts = {
    header: 1,
    defval: '',
    blankrows: true,
    raw: false,
    dateNF: 'd"/"m"/"yyyy'
  }
  
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]], jsonOpts)
  let head = [];
  head = temp[0];
  let subHead = [];
  console.log(temp.length);
  subHead = temp[1];
  result = [];
  console.log(temp);
  temp.map((val, i) => {

    if (i > 0) {
      var engagementType1x1 = [{
          'Stay Interviews': [],
          'Women Connect': []
      }];
      var engagementTypegrp = [{
        'Skip': [],
        'New Hire Connects': [],
        'NMAP': [],
        'Open House Sessions': []
    }]
      var grpMetrix = [{
        q1: [{
          skip: [{t: 0, a: 0}], nmap: [{t:0, a: 0}], ohs: [{t:0, a: 0}], nhc: [{t:0, a: 0}] 
        }],
        q2: [{
          skip: [{t: 0, a: 0}], nmap: [{t:0, a: 0}], ohs: [{t:0, a: 0}], nhc: [{t:0, a: 0}] 
        }],
        q3: [{
          skip: [{t: 0, a: 0}], nmap: [{t:0, a: 0}], ohs: [{t:0, a: 0}], nhc: [{t:0, a: 0}] 
        }],
        q4: [{
          skip: [{t: 0, a: 0}], nmap: [{t:0, a: 0}], ohs: [{t:0, a: 0}], nhc: [{t:0, a: 0}] 
        }]
      }]

      result.push({
        "username": val[0],
        "userstatus": val[1],
        "reportingtosuperuser": val[2],
        "superuserstatus": val[3],
        "reportingtosupersuperuser": val[4],
        "supersuperuserstatus": val[5],
        "admin": val[6],
        "targetachieved": grpMetrix,
        "oneonone": engagementType1x1,
        "group": engagementTypegrp,
      })
    }
  })
  console.log(result);
  res.send(JSON.stringify(result));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})