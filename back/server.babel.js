var express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/', function(req, res) {
  console.log(req.body);
  res.sendStatus(200);
});

app.get('/users', function(req, res) {
  res.json([{username: 'Vasya', age: 15, gender: 'male'}]);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});
