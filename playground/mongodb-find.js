//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server.')
  }
  console.log('Connected to MongoDB server');

// db.collection('Todos').find({
//   _id: new ObjectID("5a17d8612c963e192409b61b")
// }).toArray().then((docs) => {
//
//   console.log('TODOS: ');
//   console.log(JSON.stringify(docs, undefined, 2));
//
// }, (err) => {
//   console.log('Unable to fetch data!', err);
// });

// db.collection('Todos').find().count().then((count) => {
//   console.log(`Number of TODOS: ${count}`);
//
// }, (err) => {
//   console.log('Unable to fetch data!', err);
// });

db.collection('Users').find({name: 'Vasily'}).toArray().then((docs) => {
  console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
  console.log('Unable to fetch data', err);
})


  //db.close();

});
