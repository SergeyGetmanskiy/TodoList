const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} = require('../controllers/todos');

router.get('/', getTodos);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      description: Joi.string().required(),
      status: Joi.string().required(),
    }),
  }),
  createTodo,
);

router.delete(
  '/:todoId',
  celebrate({
    params: Joi.object().keys({
      todoId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteTodo,
);

router.patch(
  '/:todoId', 
  celebrate({
    params: Joi.object().keys({
      todoId: Joi.string().alphanum().length(24),
    }),
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      description: Joi.string().required(),
      status: Joi.string().required(),
    }),
  }),
  updateTodo
);

module.exports = router;
