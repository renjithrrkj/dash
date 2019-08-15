const MongoClient = require( 'mongodb' ).MongoClient;//this file is used to connect to db import it into 
const url = "mongodb://52.15.111.120:8080";//other files requiring connection to db

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('logOfResults');
      console.log("sucesseful");
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};
