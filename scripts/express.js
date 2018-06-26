



var express = require('express');
const app = express();
var path = require('path');

var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

nunjucks.configure('templates', {
  autoescape: true, //dont need to add ending tags in html
  express: app//tells nunjucks about express
})
app.set('view engine', 'nunjucks');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// app.use(express.static('style'));
// app.use(express.static(path.join(__dirname, '../style')));
app.use(express.static('images'));
app.use(express.static('style'));
app.use(express.static('scripts'));





// testing db CRUD
var jsObjList = { 
  biology:
  { card1: [ 'mitochondira', 'powerhouse of cell' ],
    card2: [ 'dopamine', 'neurotransmitter' ],
    card3: [ 'phalange', 'handsies or footsies' ] },
  stock:
  { card1: [ 'ROI', 'return on investment' ],
    card2: [ 'PDT', 'pattern day trader = nono' ],
    card3: [ 'robinhood', 'hit me up for a free stock =]' ] },
  instrument:
  { card1: [ 'mayonnaise', 'no Patrick' ],
    card2: [ 'contrabass tuba', 'REALLY big tuba' ],
    card3: [ 'symbols', 'who really knows' ] } };

var newCard =  {card4: [ 'anotha', 'less get et' ]};

function getSetNameList (obj) {
  var keyList = [];
  for (var key in obj) {
    keyList.push(key);
  }
  return keyList;
}
var xtest = getSetNameList(jsObjList);
// console.log(getSetNameList(jsObjList));
//returns [ 'biology', 'stock', 'instrument' ]

function getCardsInSet(setName, obj) {
  var cardList = [];
  var newObj = obj[setName];
  for (var key in newObj) {
    cardList.push(newObj[key]);
  }
  return cardList;
}
// console.log(getCardsInSet('biology', jsObjList));
//returns list of list 
// [ [ 'mitochondira', 'powerhouse of cell' ],
//   [ 'dopamine', 'neurotransmitter' ],
//   [ 'phalange', 'handsies or footsies' ] ]










app.route('/')
  .get((req, res) => {
    // console.log(jsObjList);
    res.render('display', {
      setChoice: getSetNameList(jsObjList),

    });
  })
  .post((req, res) => {
    // console.log(req.body);
    res.render('display', {
      setChoice: getSetNameList(jsObjList),
      setName: req.body.setName || req.body.setChoice, 
      cardTerm: req.body.cardTerm,
      cardDefinition: req.body.cardDefinition,
    });
    // res.end();
  });

// app.get('/', function (req, res) {
//   //  res.send('Hello World');
//   res.sendFile(path.join(__dirname, '../index.html'));
//   // res.sendFile(path.join(__dirname, '../style/index.css'));
//   // res.sendFile(path.join(__dirname, '../images/bp_logo6.png'));
// })


app.listen(8000);

// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
   
//    console.log("Example app listening at http://%s:%s", host, port)
// })





