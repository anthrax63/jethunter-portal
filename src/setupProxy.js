const proxy = require('http-proxy-middleware');

const apiEndpoint = process.env.API_ENDPOINT || 'https://api.jethunter.net/';


module.exports = function(app) {
  app.use(proxy('/graphql', {target: apiEndpoint + '/graphql', changeOrigin: true}));
  app.use(proxy('/pages', {target: apiEndpoint, changeOrigin: true}));
  app.use(proxy('/templatedata', {target: apiEndpoint, changeOrigin: true}));
};
