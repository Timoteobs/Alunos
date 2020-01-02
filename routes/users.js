var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

  admin.dashboard().then(data => {
    res.render("/", admin.getParams(req, {
      data 
    }));
  }).catch(err => {
    console.error(err);
  });
});

module.exports = router;
