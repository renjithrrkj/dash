


module.exports ={getTeam_name:function(res){

 var mongoUtil = require('./db');
 mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
  var database = mongoUtil.getDb();
  


  var col =database.collection('tez');


  var Teams={};//Teams in viq
  var Teams_fail ={};
  var Teams_pass={};
  var TeamArr=[];




  var team_name_temp;//var to store tem name temporarily
  col.aggregate(// this function retrives the docs with status passed passed and 
    
      [
      
        { $sort: {"StartTime"
        : 1} },
        //{ $match : { 'Status' : "PASSED" } },
        {
            $group://groups them into testscrpit that were excecuted lastest using last agregator 
            {
                 _id: {RunId:"$RunId"},
            
                 StartTime: { $last: "$StartTime" },
                 TestScript:{$push:{Test:"$TestScript",Stat:"$Status"}}
                 
                  //Status:{$last: "$Status"}
            }
            
        }
        
      ]
  ).toArray(function(err,latestrun){//using to array beacause asynchronous nature of js
  
    console.log(latestrun);

           /* for(var val of latestrun)//traverse recived array for objects
            {
    
                    if(val['_id']['TestScript'].substring(0,5)=='tests')//the testscript name starting with tests are python
                    {
         
                        team_name_temp=val['_id']['TestScript'].split('/')[1];
        
 
                    }
                    else
                    {
                        team_name_temp=val['_id']['TestScript'].split('.')[2];
         
                    }
                   if( Object.keys(Teams).includes(team_name_temp))//increment the value correspong to team name
                    {
                          
                          Teams[team_name_temp]++;
                          
                          if(val['Status']=="PASSED")
                          {  
                             if( Object.keys(Teams_pass).includes(team_name_temp))
                             {
                                 Teams_pass[team_name_temp]++;
                             }   
                             else
                             {
                                 Teams_pass[team_name_temp] =1;
                             }
                          }
                          else if(val['Status']=="FAILED")
                          {  
                             if( Object.keys(Teams_fail).includes(team_name_temp))
                             {
                                 Teams_fail[team_name_temp]++;
                             }   
                             else
                             {
                                 Teams_fail[team_name_temp] =1;
                             }
                          }
         
                    }
                    else// if new team name found insert to array
                    {
        
        
                           Teams[team_name_temp]=1;
                           Teams_pass[team_name_temp]=0;
                           Teams_fail[team_name_temp] = 0;
                           if(val['Status']=="PASSED")
                           {  
                              if( Object.keys(Teams_pass).includes(team_name_temp))
                              {
                                  Teams_pass[team_name_temp]++;
                              }   
                              else
                              {
                                  Teams_pass[team_name_temp] =1;
                              }
                           }
                           else if(val['Status']=="FAILED")
                           {  
                              if( Object.keys(Teams_fail).includes(team_name_temp))
                              {
                                  Teams_fail[team_name_temp]++;
                              }   
                              else
                              {
                                  Teams_fail[team_name_temp] = 1;
                              }
                           }
         
         
                    }
             }
             console.log(Teams);
             //res.json(Teams); 
             TeamArr=[Teams,Teams_pass,Teams_fail];*/
             latestrun.sort(function(a, b){
                return a.StartTime-b.StartTime
            });
            
            for(var val of latestrun)
            {
                if(val['TestScript'][0]['Test'].substring(0,5)=='tests')
                {
                    team_name_temp=val['TestScript'][0]['Test'].split('/')[1];
                }
                else
                {
                    team_name_temp=val['TestScript'][0]['Test'].split('.')[2];
                }
                if(Object.keys(Teams).includes(team_name_temp)==false)
                {
                    Teams[team_name_temp]=val['TestScript'].length;
                    var countPass = 0;var countFail=0;
                    for(var tes of val['TestScript'])
                    {
                        if(tes["Stat"]=="PASSED")
                        {
                            countPass++;
                        }
                        else
                        {
                            countFail++;
                        }
                    }
                    Teams_pass[team_name_temp]=countPass;
                    Teams_fail[team_name_temp]=countFail;
                }
                   
                
            }
            TeamArr=[Teams,Teams_pass,Teams_fail];
             res.json(TeamArr);
            });
//this is to retrive failed values
  
  
 
  });


//return Teams;



}
}