//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server.')
  }
  console.log('Connected to MongoDB server');

// deleteMany
// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
//   console.log(result);
// }, (err) => {
//   console.log('Unable to delete data');
// })

// deleteOne
// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
//   console.log(result);
// }, (err) => {
//   console.log('Unable to delete data');
// })

// findOneAndDelete
// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
//   console.log(result);
// }, (err) => {
//   console.log('Unable to delete data');
// })

//EXCERCISE 1
// db.collection('Users').deleteMany({name: 'Vasily'}).then((result) => {
//   console.log(result);
// }, (err) => {
//   console.log('Unable to delete data');
// })

db.collection('Users').findOneAndDelete({
  _id: new ObjectID('5a1837a4e65d6c24c858d125')
}).then((result) => {
  console.log(result);
}, (err) => {
  console.log('Unable to delete data with stated ID');
})

  //db.close();

});
