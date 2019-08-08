var request = require('request');
 
module.exports={get_hours:function(res){
request("http://localhost:3000/test",{json:true},(err,res,body)=>{
    
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
});
}
}
