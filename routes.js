'use strict';

const api = require('./api');

module.exports = [{
  method: 'GET',
  path: '/public/{file}',
  handler: (request, h) => {
    return h.file(request.params.file);
  }
}, {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return h.view('home');
  }
}, {
  method: 'GET',
  path: '/contact/add',
  handler: (request, h) => {
    return h.view('addContact');
  }
}, {
  method: 'POST',
  path: '/contact/addContact',
  handler: (request, h) => {
    return api.add(request, h);
  }
}, {
  method: 'GET',
  path: '/contacts',
  handler: (request, h) => {
    return api.fetch(request, h);
  }
}, {
  method: 'DELETE',
  path: '/contact/delete/{id}',
  handler: (request, h) => {
    return api.delete(request, h);
  }
}, {
  method: 'GET',
  path: '/contact/edit/{id}',
  handler: (request, h) => {
    return api.edit(request, h);
  }
}, {
  method: 'PUT',
  path: '/contact/update/{id}',
  handler: (request, h) => {
    return api.update(request, h);
  }
}, {
  method: 'PATCH',
  path: '/contact/mobileUpdate/{id}',
  handler: (request, h) => {
    return api.mobileUpdate(request, h);
  }
}, {
  method: [ 'GET', 'POST' ],
  path: '/{any*}',
  handler: (request, h) => {
    return h.view('404').code(404);
  }
}];
