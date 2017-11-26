const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// const id = '5a1adb8c052f8d341f5a944e111';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todos', todo);
// })

// Todo.findById(id).then((todos) => {
//   if (!todos) {
//     return console.log('Id not found')
//   }
//   console.log('Todos with ID', todos)
// }).catch((err) => {
//   return console.log(err);
// })


User.findById('5a19c09ff0595d64374ae35b').then((users) => {
  if(!users) {
    return console.log('Users with this ID not found');
  }
  console.log('Users with ID', users);
}).catch((err) => {
  return console.log(err);
});
