



var express = require('express');
const app = express();
var path = require('path');

// app.use(express.static('style'));
// app.use(express.static(path.join(__dirname, '../style')));
app.use(express.static('images'));
app.use(express.static('style'));
app.use(express.static('scripts'));

app.get('/', function (req, res) {
  //  res.send('Hello World');
  res.sendFile(path.join(__dirname, '../index.html'));
  // res.sendFile(path.join(__dirname, '../style/index.css'));
  // res.sendFile(path.join(__dirname, '../images/bp_logo6.png'));
})


app.listen(5050);

// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
   
//    console.log("Example app listening at http://%s:%s", host, port)
// })





