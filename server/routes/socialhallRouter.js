var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  res.sendFile('/jo_chat/public/socialhall.html');
});


// server.listen(app.get('port'), () => {
//   console.log(app.get('port'));
//   console.log("Server Started-i. http://localhost:4555");
// });


module.exports = router;