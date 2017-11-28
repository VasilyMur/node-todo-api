const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');


const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];


beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
})

describe('POST /todos', () => {
  // Test 1
  it('should Not create a new todo with invalid body data', (done) => {
    const text = 'Test todo app';

    request(app)
      .post('/todos')
      .send({text: text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      }).end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });

  });


// Test 2
it('should also create a new todo', (done) => {
  const text = '';

  // Start supertest request
  request(app)
    .post('/todos')
    .send({text})
    .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      };

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));

    });
})

});



describe('GET /todos', () => {
  it('should get all todos', (done) => {

    // Start supertest request
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });

});


describe('GET /todos/:id', () => {

  it('should get all todos with ID', (done) => {

    //Start supertest request
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.text).toBe(todos[0].text);
      })
      .end(done);

    });

it('should return 404 if todo is not found', (done) => {
  const newId = new ObjectID();
  //Start supertest request
  request(app)
    .get(`/todos/${newId.toHexString()}`)
    .expect(404)
    .end(done);
});


it('should return 404 for non-object IDs', (done) => {

  //Start supertest request
  request(app)
    .get('/todos/123')
    .expect(404)
    .end(done)
  });

});


describe('DELETE /todos/:id', () => {

it('should remove a todo', (done) => {
  const myId = todos[0]._id.toHexString();
  //Start supertest request
  request(app)
    .delete(`/todos/${myId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(myId);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.findById(myId).then((result) => {
        expect(result).toNotExist();
        done();
      }).catch((err) => {
        return done(err);
      })

    })

});


it('should return 404 if todo not found', (done) => {
  const myId = new ObjectID().toHexString();
  //Start supertest request
  request(app)
    .delete(`/todos/${myId}`)
    .expect(404)
    .end(done);
});


it('should return 404 if object ID is not valid', (done) => {
  const myId = '123';
  //Start supertest request
  request(app)
    .delete(`/todos/${myId}`)
    .expect(404)
    .end(done);
  });
});

describe('PATCH /todos/:id', () => {

  it('should update the todo', (done) => {
    const hexId = todos[0]._id.toHexString();
    const text = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done)


  });



  it('should clear completedAt when todo is not completed', (done) => {
    const hexId = todos[1]._id.toHexString();
    const text = 'This should be the new text!!!!';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done)

  });




})
