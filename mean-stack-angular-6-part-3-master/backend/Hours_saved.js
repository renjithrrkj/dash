var request = require('request');
 
module.exports={get_hours:function(res){
var jira=[];
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
            "testAPI3 - ATTR-4151" };
        var newvalues = { $set: {hours_saved:0.5} };
        col.updateMany(myquery, newvalues);
    }
    res.json(jira);
    

})





}
}
