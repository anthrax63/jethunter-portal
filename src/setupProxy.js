const proxy = require('http-proxy-middleware');


module.exports = function(app) {
  app.use(proxy('/graphql', {target: 'http://localhost:8080/'}));
  app.use(proxy('/pages', {target: 'http://localhost:8080/'}));
  app.use(proxy('/templatedata', {target: 'http://localhost:8080/'}));
};
