



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

app.use(express.static('images'));
app.use(express.static('style'));
app.use(express.static('scripts'));
//mongoDB
var ObjectId = require('mongodb').ObjectID;
const mongodb = require('mongodb').MongoClient;
var db;
mongodb.connect('mongodb://localhost:27017', (error, client) => {
  if (error) {
    console.error(error);
    client.close();
  }
  db = client.db('xflashcard');
  app.listen(8000, () => {
    console.log('listening on 8k');
  });
});

// find stuff in db
function dbInfo (res) {
  db.collection('xflashcard').find({}).toArray((error, results) => {
    if (error) {
      return console.log(error);
    }
    // console.log('results: ' + results[0]._id);
    res.render('display', {
      xarray: results,
    });
  });
}


//routes
app.route('/')
  .get((req, res) => {
    db.collection('xflashcard').find({}).toArray((error, results) => {
      if (error) {
        return console.log(error);
      }
      console.log('results-: ' + results);
      res.render('display', {
        xarray: results,
        setname: req.body.setName,
      });
    });
  })
  .post((req, res) => {
    console.log(req.body);
    db.collection('xflashcard').insertOne(req.body, (err, results) => {
      if (err) {
        return console.log(err);
      }

      db.collection('xflashcard').find({}).toArray((error, results) => {
        if (error) {
          return console.log(error);
        }
        res.render('display', {
          xarray: results,
          setname: req.body.setName,
        });
      });
    });
  });


app.route('/delete/:id')
  .post((req, res) => {
    console.log(req.body.deleteItem);
    // console.log('~');
    // console.log(req.body.pname);
    // console.log('~~');
    // console.log(req.body._id);

    var query = { _id: ObjectId(req.body.deleteItem.toString()) };
    db.collection("xflashcard").deleteOne(query, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      dbInfo(res);
    });
  });


app.route('/edit/:id')
  .get((req, res) => {
    console.log(req.query.editItem);
    var query = { _id: ObjectId(req.query.editItem.toString()) };
    db.collection('xflashcard').findOne(query, (error, result) => {
      if (error) {
        return console.log(error);
      }
      console.log('edit-results-: ' + result);
      console.log(result);
      res.render('edit', {
        // xarray: results,
        // setname: req.body.setName,
        xarrayedit: result,
      });
    });
  })
  .post((req, res) => {
    console.log(req.body.editItem);
    console.log('~');
    console.log(req.body);
    console.log('~~');
    console.log(req.body._id);

    var findId = { _id: ObjectId(req.body._id.toString()) };
    var oldValue = db.collection("xflashcard").findOne(findId, function(err, result) {
      if (err) throw err;
      console.log('@@');
      console.log(result);
      // return result;
      // db.close();
    }).then(() => {
      var query = req.body;
      // var query = { _id: ObjectId(req.body._id.toString()) };
      console.log(query);
      console.log('~~query');
      var newValue = { $set: query };
      db.collection("xflashcard").updateOne(oldValue, newValue, function(err, obj) {
        if (err) throw err;
        console.log("x1 document edited");
        dbInfo(res);
      });
    });

    // var query = req.body;
    // // var query = { _id: ObjectId(req.body._id.toString()) };
    // console.log(query);
    // console.log('~~query');
    // var newValue = { $set: query };
    // db.collection("xflashcard").updateOne(oldValue, newValue, function(err, obj) {
    //   if (err) throw err;
    //   console.log("x1 document edited");
    //   dbInfo(res);
    // });
  });



// app.route('/')
//   .get((req, res) => {
//     // console.log(jsObjList);
//     res.render('display', {
//       setChoice: getSetNameList(jsObjList),

//     });
//   })
//   .post((req, res) => {
//     // console.log(req.body);
//     res.render('display', {
//       setChoice: getSetNameList(jsObjList),
//       setName: req.body.setName || req.body.setChoice, 
//       cardTerm: req.body.cardTerm,
//       cardDefinition: req.body.cardDefinition,
//     });
//     // res.end();
//   });








