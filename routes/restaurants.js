var express = require('express');  
var router = express.Router();
var elastic = require('../elasticsearch');

/* GET all restaurants */
router.get('/', function (req, res, next) {  
  elastic.getAllRestaurants(req.query).then(function (result) { res.json(result) });
});

/* GET opened restaurants */
router.get('/opened', function (req, res, next) {  
  elastic.getOpenedRestaurants(req.query).then(function (result) { res.json(result) });
});

module.exports = router;