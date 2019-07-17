module.exports ={get_Daily:function(res)
    {
    
    var mongoUtil = require('./db');
    mongoUtil.connectToServer( function( err, client ) {
     if (err) console.log(err);
     var database = mongoUtil.getDb();
     var col =database.collection('tez');
     var Team_date=[];

     col.aggregate([//to retrive the number of tests conducted in a day
        { "$group": {
            "_id": {Test : "$TestScript",
                
           Sub:{ "$subtract": ["$StartTime",
              { "$mod": [
               "$StartTime",
               1000* 60 * 60 * 24
            ]}] }
                                                               
                 
            },
           "count": { "$sum": 1 },
            
         
        
        }
    
    
        }
    ]).toArray(function(err,Days_tests){
        if(err)
        {
            console.log(err);
        }
        else
        {
            var team_name_temp;
            var date_temp;
            for(var val of Days_tests)//traverse recived array for objects
            {
    
                    if(val['_id']['Test'].substring(0,5)=='tests')//the testscript name starting with tests are python
                    {
         
                        team_name_temp=val['_id']['Test'].split('/')[1];
                        
        
 
                    }
                    else
                    {
                        team_name_temp=val['_id']['Test'].split('.')[1];
         
                    }

                    date_temp=val['_id']['Sub']
                    
                    if( (Team_date).includes({"Team":team_name_temp,"Date":date_temp}))//increment the value correspong to team name
                    {
                          
                          Team_date[{Team:team_name_temp,Date:date_temp}]+= val['count'];
                          
                          
                          
                         
         
                    }
                    else// if new team name found insert to array
                    {
        
        
                           Team_date["{Team:team_name_temp,Date:date_temp}"]=val['count'];
                           
                          console.log(Team_date[{Team:team_name_temp,Date:date_temp}]) 
                          console.log(Team_date);
         
                    }
           
                }
                console.log(Team_date);
                res.json(Team_date);
            }
        
        
    })


    })
    
    }
}