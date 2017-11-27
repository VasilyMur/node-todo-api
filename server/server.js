const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route 1
app.post('/todos', (req, res) => {

  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });

});

// Route 2
app.get('/todos', (req, res) => {

  Todo.find().then((todos) => {
    res.send({todos: todos})
  }, (err) => {
    res.status(400).send(err);
  });
});

// Route 3: Find Individual TODO by ID
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todos) => {
    if(!todos) {
      return res.status(404).send();
    }
    res.send({todos});
  }).catch((err) => {
    return res.status(400).send();
  })

})



app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});


module.exports = {
  app: app
}
