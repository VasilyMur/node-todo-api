require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

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
  });
});

// Delete Record by ID Route
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  });

});


app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed'])


  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Not Valid');
  }

  //if its boolean & true
  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();

  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send('Not Found');
    }

    res.send({todo});
  }).catch((err) => {
    res.status(400).send(err);
  })

});


app.post('/users', (req, res) => {

  const body = _.pick(req.body, ['email', 'password'])

  const userNew = new User({
    email: body.email,
    password: body.password
  });


  userNew.save().then((user) => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(userNew);

  }).catch((err) => {
    res.status(400).send(err);
  });

});


app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
  }).catch((err) => {
    res.status(400).send();
  });
});


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});


module.exports = {
  app: app
}
