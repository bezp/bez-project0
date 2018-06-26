// // find stuff in db
// function dbInfo (res) {
//   db.collection('xflashcard').find({}).toArray((error, results) => {
//     if (error) {
//       return console.log(error);
//     }
//     // console.log('results: ' + results[0]._id);
//     res.render('display', {
//       xarray: results,
//     });
//   });
// }


// //routes
// app.route('/')
//   .get((req, res) => {
//     db.collection('xflashcard').find({}).toArray((error, results) => {
//       if (error) {
//         return console.log(error);
//       }
//       console.log('results-: ' + results);
//       res.render('display', {
//         xarray: results,
//         setname: req.body.setName,
//       });
//     });
//   })
//   .post((req, res) => {
//     console.log(req.body);
//     db.collection('xflashcard').insertOne(req.body, (err, results) => {
//       if (err) {
//         return console.log(err);
//       }

//       db.collection('xflashcard').find({}).toArray((error, results) => {
//         if (error) {
//           return console.log(error);
//         }
//         res.render('display', {
//           xarray: results,
//           setname: req.body.setName,
//         });
//       });
//     });
//   });


// app.route('/delete/:id')
//   .post((req, res) => {
//     console.log(req.body.deleteItem);
//     // console.log('~');
//     // console.log(req.body.pname);
//     // console.log('~~');
//     // console.log(req.body._id);

//     var query = { _id: ObjectId(req.body.deleteItem.toString()) };
//     db.collection("xflashcard").deleteOne(query, function(err, obj) {
//       if (err) throw err;
//       console.log("1 document deleted");
//       dbInfo(res);
//     });
//   });


// app.route('/edit/:id')
//   .get((req, res) => {
//     console.log('editItem-----');
//     console.log(req.query.editItem);
//     var query = { _id: ObjectId(req.query.editItem.toString()) };
//     db.collection('xflashcard').findOne(query, (error, result) => {
//       if (error) {
//         return console.log(error);
//       }
//       console.log('edit-results-edit: ' + result);
//       console.log(result);
//       res.render('edit', {
//         // xarray: results,
//         // setname: req.body.setName,
//         xarrayedit: result,
//       });
//     });
//   })
//   .post((req, res) => {
//     console.log(req.body.editItem);
//     console.log('~');
//     console.log(req.body);
//     console.log('~~');
//     console.log(req.body._id);
//     console.log('~~!~~!~~');

//     var selectedValues = { 
//       setName: req.body.setName.toString(),
//       cardTerm: req.body.cardTerm.toString(),
//       cardDefinition: req.body.cardDefinition.toString()
//     };
//     var newStoof = { $set: selectedValues };
//     db.collection("xflashcard").findOne( {_id: ObjectId(req.body._id.toString())} ).then((data) => { 
//       console.log('looking for 1');
//       console.log(data);
//       // db.close();
//       return data;
//     }).then((data) => {
//       console.log('xxx');
//       console.log(data);
//       console.log('xxxend-data');
//       db.collection("xflashcard").updateOne(data, newStoof, function(err, obj) {
//         if (err) throw err;
//         console.log("x1 document edited");
//         dbInfo(res);
//       });
//     });
//   });



