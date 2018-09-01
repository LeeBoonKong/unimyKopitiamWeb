var express = require('express');
var router = express.Router();
var url="mongodb://localhost:27017/test"
var mongoose = require('mongoose');

mongoose.connect(url);

var Schema = mongoose.Schema;

var confessionSchema = new Schema({
  content : String,
  date : {type: Date, default:Date.now}
}, {collection: 'confession-data'});

var Confession = mongoose.model('Confession', confessionSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  Confession.find()
  .sort({date: -1})
  .then(function(doc){
    res.render('index', {title: 'Unimy Kopitiam', confession: doc});
  });
});

router.post('/post-confession', function(req,res){
  var input = {
    content : req.body.confessionText,
  };
  var data = new Confession(input);
  data.save();
  res.redirect('/');
});

router.get('/get-confession', function(req, res, next){
  Confession.find()
  .limit(20)
  .then(function(doc){
    res.render('index', { confession: doc});
  });
});

module.exports = router;
