var express = require('express');
var router = express.Router();
var url="mongodb://localhost:27017"
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/test')

var Schema = mongoose.Schema;

var confessionSchema = new Schema({
  id : {type : Number , required : true},
  content : String,
  date : Date
});

var Confession = mongoose.model('confession', confessionSchema);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Unimy Kopitiam' });
});

router.post('/post-confession', function(req,res){

});

router.get('/get-confession', function(req, res, next){

});

module.exports = router;
