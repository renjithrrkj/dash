const express =require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
 var mongoUtil = require('./db');
 var resolved =require('./resolver');
 var No_Of_Tests = require('./No_Of_Tests');
 var No_Of_Tests_Month =require('./No_Of_Test_Month');
 var No_Of_Tests_Year =require('./No_Of_Test_Year');
 var Hours_saved =require('./Hours_saved');
 var Hours_saved_Month= require('./Hours_saved_Month');
 var Hours_saved_Year = require('./Hours_saved_Year');

//const tez =require('./models/tez');
var database = mongoUtil.getDb();


mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
  // start the rest of your app here


  var database = mongoUtil.getDb();
  const {parse, stringify} = require('flatted/cjs');


const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

//mongoose.connect('mongodb://10.60.163.75:27017/logOfResults');

//const connection = mongoose.connection;

//connection.once('open', () => {
//    console.log('mongodb tez database connection established successfully!');
//});
 var result
 

 var latestruns;

 database.collection('tez').find({"TestScript":"attrqa.authtoken.AuthorizationToken_MIE"}).toArray(function(err,data){
 function queryinterval(){
 database.collection('tez').find({"RunId":"ZWYSA22H"}).toArray(function(err,data){
     
       result=data;
      // console.log(data);
 });}
 setInterval(queryinterval, 1500);

    //asynchronous ,res.json is excecuted before the promise is resolved

 var col =database.collection('tez')
  
 /*col.aggregate(
    [
      { $sort: {  "TestScript": 1,"StartTime"
      : 1} },
      {
        $group:
          {
            _id: "$TestScript",
            
            StartTime: { $last: "$StartTime" }
          }
      }
    ]
).toArray(function(err,latest){
  
   latestruns = latest;
   console.log(latest);
 })*/


router.get("/tez",(req, res) => {
     
    
       res.json(result);
       console.log(result);
    
            //res.json(issues);
            
    
});

router.route('/Teams/daily').get((req, res) => {
   var d= new Date(1562659727000);
    console.log(d);
    No_Of_Tests.get_Daily(res);
});
router.get('/Teams',(req,res)=>{
     resolved.getTeam_name(res);
    
    //console.log(kr);
});

router.route('/Teams/monthly').get((req, res) => {
    var d= new Date(1562659727000);
     console.log(d);
     No_Of_Tests_Month.get_Daily(res);
 });
  
 router.route('/Teams/yearly').get((req, res) => {
    var d= new Date(1562659727000);
     console.log(d);
     No_Of_Tests_Year.get_Daily(res);
 });

 router.get('/hours',(req,res)=>{
     Hours_saved.get_hours(res);
 });

 router.get('/hours/month',(req,res)=>{
    Hours_saved_Month.get_hours_month(res);
});

router.get('/hours/year',(req,res)=>{
    Hours_saved_Year.get_hours_year(res);
});

/*router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})*/

app.use('/', router);


app.listen(8082, () => console.log('Express server running on port 8082 now'));

});
});
