var express = require('express');
var router = express.Router();
var url="mongodb://leeboonkong:hhdqJRDHDcBJ0q3q@unimykopitiamcluster-shard-00-00-ffk6e.gcp.mongodb.net:27017,unimykopitiamcluster-shard-00-01-ffk6e.gcp.mongodb.net:27017,unimykopitiamcluster-shard-00-02-ffk6e.gcp.mongodb.net:27017/test?ssl=true&replicaSet=UnimyKopitiamCluster-shard-0&authSource=admin&retryWrites=true"
var url2="localhost:27017/test"
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
