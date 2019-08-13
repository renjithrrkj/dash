var request = require('request');
 
module.exports={get_hours:function(res){
var jira=[];var Team_date =[];var count_of_Tests=0;
request("http://localhost:3000/test",{json:true},(err,res,body)=>{
    
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    console.log(res);
    jira = res;
    
    
   
});

var mongoUtil = require('./db');
mongoUtil.connectToServer( function( err, client ) {
    if (err) console.log(err);
    var database = mongoUtil.getDb();
    var col = database.collection('tez');
    console.log(jira);
    jira=Array(jira);
    for(var val of jira)
    {
        var myquery = { TestCaseID
            :
            val['testid'] };
        var newvalues = { $set: {hours_saved:0.5} };
        col.updateMany(myquery, newvalues);
    }
   // res.json(jira);
   col.aggregate([//to retrive the number of tests conducted in a day
    { "$group": {
        "_id": {Test : "$TestScript",
            
       Sub:{ "$subtract": ["$StartTime",
          { "$mod": [
           "$StartTime",
           1000* 60 * 60 * 24
        ]}] }
                                                           
             
        },
       "count": { "$sum": "$hours_saved" },
        
     
    
    }


    }
]).toArray(function(err,Days_hours){

    if(err)
    {
        console.log(err);
    }
    else
    {
        var team_name_temp;
        var date_temp;
        console.log(Days_hours);
        for(var val of Days_hours)//traverse recived array for objects
        {

                if(val['_id']['Test'].substring(0,5)=='tests')//the testscript name starting with tests are python
                {
     
                    team_name_temp=val['_id']['Test'].split('/')[1];
                    date_temp=val['_id']['Sub'] //*1000;
                    
    

                }
                else
                {
                    team_name_temp=val['_id']['Test'].split('.')[2];
                    date_temp=val['_id']['Sub'];
     
                }
                

                
                
                
                
                       
                count_of_Tests+=val['count'];
    
                       Team_date.push({"Team":team_name_temp,"Date":date_temp,"count":val['count']});
                       
                     // console.log(Team_date[{Team:team_name_temp,Date:date_temp}]) 
                     // console.log(Team_date);
     
                
       
         }

        //var sum=0;
        for(var i=0;i<Team_date.length-1;i++)                    
        {
        console.log(count_of_Tests);
            for(var j=i+1;j<Team_date.length;j++)
            {
                if((Team_date[i]["Team"]==Team_date[j]["Team"]))
                {
                    if(Team_date[i]["Date"]==Team_date[j]["Date"])
                    {
                       
                        Team_date[i]["count"]+=Team_date[j]["count"];
                        
                        Team_date.splice(j,1);  
                        
                        console.log(Team_date.length); 
                        j=j-1;     

                       
                    }
                }
            }
        }
       //for(var i=0;i<Team_date.length;i++)
       /* {
            sum += i["count"];
        }
        {
            for(var j=i+1;j<Team_date.length;j++)
            {
                if((Team_date[i]["Team"]==Team_date[j]["Team"])){
                    if(Team_date[i]["Date"]==Team_date[j]["Date"])
                    {
                       {
                        Team_date[i]["count"]+=Team_date[j]["count"];
                        
                        Team_date.splice(j,1);  
                        
                        console.log(Team_date);                          
                       }
                    }}
            }
        }*/
        console.log("c"+count_of_Tests);
        Team_date.push({"No Of Hours_saved":count_of_Tests});
        console.log(Team_date);
        res.json(Team_date);
        }
    
    
})


})






}
}
