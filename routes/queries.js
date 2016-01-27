var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('not found');
});

router.get('/accounts', function(req, res, next) {
  res.send('get accounts');
});

router.get('/account', function(req, res, next) {
  res.send('get account');
});

module.exports = router;
