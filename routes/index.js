var express = require('express');
var router = express.Router();

const config = require('../core/config');
const fetch = require('node-fetch');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
