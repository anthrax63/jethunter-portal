const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(proxy('/graphql', {target: 'https://jethunterdemo.herokuapp.com/graphql'}));


app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});


app.listen(PORT, () => {
  console.log('Server Started on Port ', PORT);
});
