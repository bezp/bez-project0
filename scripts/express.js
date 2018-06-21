



var express = require('express');
const app = express();
var path = require('path');

app.get('/', function (req, res) {
  //  res.send('Hello World');
  res.sendFile(path.join(__dirname, '../index.html'));
})


app.listen(5050);

// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
   
//    console.log("Example app listening at http://%s:%s", host, port)
// })





