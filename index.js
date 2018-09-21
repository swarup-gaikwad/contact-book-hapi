'use strict';

const Hapi = require('hapi');
const db = require('./database').db;
const Path = require('path');
var routes = require('./routes');

const server = Hapi.server({
  port: 8080,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'public')
    }
  }
});

const start = async () => {

  await server.register([require('vision'), require('inert')]);

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates',
    layout: true,
    layoutPath: 'templates/layout'
  });

  server.route(routes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

start();