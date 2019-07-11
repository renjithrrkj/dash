


module.exports ={getTeam_name:function(){
var mongoUtil = require('./db');
var database = mongoUtil.getDb();

mongoUtil.connectToServer( function( err, client ) {
    if (err) console.log(err);
    var col =database.collection('tez')


var col =database.collection('tez');


var latestruns=[]; 


var Teams={};//Teams in viq
var team_name_temp;//var to store tem name temporarily
col.aggregate(// this function retrives the docs with status passed passed and 
    
    [
    { $match : { 'Status' : "PASSED" } },
      { $sort: {  "TestScript": 1,"StartTime"
      : 1} },
      {
        $group://groups them into testscrpit that were excecuted lastest using last agregator 
          {
            _id: "$TestScript",
            
            StartTime: { $last: "$StartTime" }
          }
      }
    ]
).toArray(function(err,latestrun){//using to array beacause asynchronous nature of js
  
   latestruns=  latestrun;//not required change this

   
  // console.log(latestruns);
   for(var val of latestruns)//traverse recived array for objects
   {
    console.log(val['_id']);
      if(val['_id'].substring(0,5)=='tests')//the testscript name starting with tests are python
     {
         
        team_name_temp=val['_id'].split('/')[1];
        console.log(team_name_temp);
 
     }
     else
     {
         team_name_temp=val['_id'].split('.')[1];
         
     }
     if( Object.keys(Teams).includes(team_name_temp))//increment the value correspong to team name
     {
         Teams[team_name_temp]++;
         console.log(/*Teams[team_name_temp]*/Object.keys(Teams));
     }
     else// if new team name found insert to array
     {
         Teams[team_name_temp]=1;
         console.log(Object.keys(Teams));
         
     }
    } 

console.log((Teams));
   
 })

 console.log(latestruns);
 

  
 });
}

}
