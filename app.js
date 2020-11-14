const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('express-async-errors');

const auth = require('./middleware/auth.mdw');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.json(1);
});

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/users', require('./routes/user.route'));
app.use('/api/film', auth, require('./routes/film.route'));

app.use(function (req, res, next) {
  res.status(404).send({
    message: 'Resource not found!'
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Sakila backend is running at http://localhost:${PORT}`);
})
