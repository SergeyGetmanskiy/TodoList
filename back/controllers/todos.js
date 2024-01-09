const Todo = require('../models/todo');

const AuthError = require('../errors/AuthError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenRequestError = require('../errors/ForbiddenRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getTodos = (req, res, next) => {
  Todo.find({})
    .then((todos) => res.send(todos))
    .catch(next);
};

module.exports.createTodo = (req, res, next) => {
  const { name, description, status } = req.body;
  Todo.create({ name, description, status })
    .then((todo) => res.status(201).send(todo))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Incorrect input data when creating 'Todo'. ${err.message}`));
      }
      next(err);
    });
};

module.exports.deleteTodo = (req, res, next) => {
  Todo.findByIdAndRemove(req.params.todoId)
    .then((todo) => {
      if (!todo) {
        return Promise.reject(new NotFoundError('Todo not found'));
      }
      return res.status(200).send(todo);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Incorrect input data when deleting "Todo"'));
      }
      next(err);
    });
};

  module.exports.updateTodo = (req, res, next) => {
    const { name, description, status } = req.body;
    Todo.findByIdAndUpdate(
      req.params.todoId,
      { name, description, status },
      {
        new: true,
        runValidators: true,
      },
    )
      .then((todo) => res.status(200).send(todo))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Incorrect input data when updating "Todo"'));
        }
        next(err);
      });
  };
