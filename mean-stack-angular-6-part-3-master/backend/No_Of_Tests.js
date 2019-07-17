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
                        team_name_temp=val['_id']['Test'].split('.')[2];
         
                    }

                    date_temp=val['_id']['Sub']
                    
                    
                    
        
        
                           Team_date.push({"Team":team_name_temp,"Date":date_temp,"count":val['count']});
                           
                         // console.log(Team_date[{Team:team_name_temp,Date:date_temp}]) 
                         // console.log(Team_date);
         
                    
           
             }

            //var sum=0;
            for(var i of Team_date)
           /* {
                sum += i["count"];
            }*/
            {
                for(var j of Team_date)
                {
                    if((i["Team"]==j["Team"]))
                        if(i["Date"]==j["Date"])
                        {
                           {
                            i["count"]+=j["count"];
                            var index= Team_date.indexOf(j);
                            if(index>-1){
                            Team_date.splice(index,1);  
                            console.log(index);
                            console.log(Team_date);    }                       
                           }
                        }
                }
            }
            console.log(Team_date);
            res.json(Team_date);
            }
        
        
    })


    })
    
    }
}