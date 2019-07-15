module.exports ={get_Daily:function(res)
    {
    var Test_no;
    var mongoUtil = require('./db');
    mongoUtil.connectToServer( function( err, client ) {
     if (err) console.log(err);
     var database = mongoUtil.getDb();
     var col =database.collection('tez');

     col.aggregate([//to retrive the number of tests conducted in a day
        { "$group": {
            "_id": {
                "$subtract": ["$StartTime",
                { "$mod": [
                   "$StartTime",
                  1000 * 60 * 60 * 24
                ]}
                 
            ]},
           "count": { "$sum": 1 }
            },
         }
    
    ]).toArray(function(err,Days_tests){
        if(err)
        {
            console.log(err);
        }
        else
        {
            
            console.log(Days_tests);
            Test_no=Days_tests;
            res.json(Test_no);
        }
        
    })


    })
    
    }
}