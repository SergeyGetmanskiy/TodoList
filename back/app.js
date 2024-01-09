const express = require('express');

require('dotenv').config();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const { PORT = 3001, DATABASE_URL = 'mongodb://127.0.0.1:27017/todos' } = process.env;

const app = express();

const helmet = require('helmet');

const { errors } = require('celebrate');

const cors = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
})
  .then(
    () => {
      console.log('Connected to MongoDB');
    },
    (err) => {
      console.log(`Ошибка ${err}`);
    },
  );

app.use(cors);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/todos', require('./routes/todos'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не существует.'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
