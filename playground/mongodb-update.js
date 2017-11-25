//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server.')
  }
  console.log('Connected to MongoDB server');

// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID("5a1932dc4fe9df1e8c821473")
// }, {
//   $set: {
//     completed: true
//   }
// }, {
//   returnOriginal: false
// }).then((result) => {
//   console.log(result);
// }, (err) => {
//   console.log('Unable to update Data')
// })

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('5a192a834fe9df1e8c82146e')
}, {
  $set: {
    name: 'Vasilich'
  },
  $inc: {
    age: 1
  }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
}, (error) => {
  console.log('Unable to update Data')
})






  //db.close();

});
