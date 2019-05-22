const proxy = require('http-proxy-middleware');

const apiEndpoint = process.env.API_ENDPOINT || 'http://localhost:8080/';


module.exports = function(app) {
  app.use(proxy('/graphql', {target: apiEndpoint, changeOrigin: true}));
  app.use(proxy('/pages', {target: apiEndpoint, changeOrigin: true}));
  app.use(proxy('/templatedata', {target: apiEndpoint, changeOrigin: true}));
};
