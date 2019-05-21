const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();

const port = process.env.PORT || 5000;
const apiEndpoint = process.env.API_ENDPOINT || 'https://api.jethunter.net/';

app.use(proxy('/graphql', {
  target: apiEndpoint, secure: false,
  changeOrigin: true
}));

app.use(proxy('/pages', {
  target: apiEndpoint, secure: false,
  changeOrigin: true
}));

app.use(proxy('/templatedata', {
  target: apiEndpoint, secure: false,
  changeOrigin: true
}));

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});


app.listen(port, () => {
  console.log('Server Started on Port ', port);
});
