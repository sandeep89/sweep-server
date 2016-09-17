var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var b = new Buffer(req.query.i, 'base64')
	var s = b.toString();
	console.log(s);
	res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
	res.send(req.body);
})

module.exports = router;
