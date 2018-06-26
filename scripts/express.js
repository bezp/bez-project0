



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
  } else {
    db = client.db('xflashcard');
    app.listen(8000, () => {
    console.log('listening on 8k');
    });
  }


  function checkDB() {
    db.collection('xflashcard').find({}).toArray((err, result) => {
      if (err) throw err;
      // console.log(result); //gives list of objects in db
      console.log('# of db items: ' + result.length);
    });
  }

  app.route('/') //Main page route
    .get((req, res) => {
      db.collection('xflashcard').find({}).toArray((err, result) => {
        if (err) throw err;
        // console.log(result); //list of objects with _id, setName, cardTerm, cardDefinition

        // make list of sets
        var setTitles = [];
        if (result) {
          for (var obj in result) {
            setTitles.push(result[obj].setName);
          }
        }
        var setTitlesUnique = [...new Set(setTitles)]; //creates list without the set obj ; spread operator ... transform the set back into an Array
        // console.log(setTitlesUnique);  
        res.render('home', {
          xarraylist: result,
          setTitlesUnique: setTitlesUnique,
        });
      });
    }) //end get for ('/')
  .post((req, res) => {
    // console.log(req.body);
    // console.log(' (/) post req.body');
    db.collection('xflashcard').insertOne(req.body, (err, result) => {
      if (err) throw err;
      // console.log(result); //long thing
      var setRedirect = req.headers.referer.slice(22); // ignore the first part 'http://localhost:8000/bio'
      res.redirect('/' + setRedirect);
    });
  }); //end post for ('/')



  app.route('/edit/:id')
    .get((req, res) => {
      // console.log(req.query);
      // console.log('editItem');
      var query = { _id: ObjectId(req.query.editItem) };
      db.collection('xflashcard').findOne(query, (error, result) => {
        if (error) {
          return console.log(error);
        }
        res.render('edit', {
          setname: req.body.setName,
          xarrayedit: result,
        });
      });
    })
    .post((req, res) => {
      var selectedValues = { 
        setName: req.body.setName.toString(),
        cardTerm: req.body.cardTerm.toString(),
        cardDefinition: req.body.cardDefinition.toString()
      };
      var newStoof = { $set: selectedValues };
      db.collection("xflashcard").findOne( {_id: ObjectId(req.body._id.toString())} ).then((data) => { 
        return data;
      }).then((data) => {
        db.collection("xflashcard").updateOne(data, newStoof, function(err, obj) {
          if (err) throw err;
          var setRedirect = req.headers.referer.slice(22); // ignore the first part 'http://localhost:8000/bio'
          res.redirect('/' + data.setName);
        });
      });
    });




  app.route(/[a-z0-9]/)
    .get((req, res) => {
      // console.log('set url thing is --' + req.url);

      var setQuery = req.url.slice(1); // string of set name
      // console.log(setQuery);
      var formattedQuery = { setName: setQuery }; //formatted
      db.collection('xflashcard').find(formattedQuery).toArray((err, result) => {
        if (err) throw err;

        // console.log(result); //list of obj w/ setname = formattedQuery
        res.render('set', {
          cardList: result,
        });
      })
    }) // end get for set routes

  app.route('/delete/:id')
    .post((req, res) => {
      // console.log('on dlt page');
      // var query = { _id: ObjectId(req.body.deleteItem.toString()) };
      var query = { _id: ObjectId(req.body.deleteItem.toString()) };
      // console.log('@@@@@');
      // console.log(req.headers.referer);
      db.collection("xflashcard").deleteOne(query, function(err, obj) {
        if (err) throw err;
        // console.log("1 document deleted");
        // dbInfo(res);
        var setRedirect = req.headers.referer.slice(22); // ignore the first part 'http://localhost:8000/bio'
        // console.log('~~~~~~~ is ' + setQuery);
        res.redirect('/' + setRedirect);
      });
    }) //end post for delete routes

















  console.log('~~~~~~~~~~');
  checkDB();


}); //end mongo connect


//43-155













