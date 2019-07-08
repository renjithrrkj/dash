const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://10.60.163.75:27017";

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