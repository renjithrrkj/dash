//schema to get data from db logOf results
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let tez = new Schema({
    _id:{
        type:Object},
       RunId:{
      type:String},
      StartTime
      :{
      type:Number},
      TestScript
      :{
      type:String},
      TestCaseID
      :
      {type:String},
      Status
      :{type :Number}
      ,
      TimeElapsed
      :{
      type:Number},
      hostname
      :{type:
      String}
});
 module.exports =  mongoose.model('tez', tez);//name of collection is tez