'use strict';

const Hapi = require('hapi');
const db = require('./database').db;
const Contact = require('./models/contact');
const Path = require('path');

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

    server.route({
        method: 'GET',
        path: '/public/main.js',
        handler: function (request, h) {
            return h.file('main.js');
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {

            return h.view('addContact');
        }
    });

    server.route({
        method: 'GET',
        path: '/api',
        handler: (request, h) => {
            return ('Hello, API!');
        }
    });
    server.route({
        method: ['PUT', 'POST'],
        path: '/api/contact',
        handler: async (request, reply) => {
            const promise = new Promise((resolve, reject) => {
                const contact = new Contact({
                    fName: request.payload.fName,
                    lName: request.payload.lName,
                    mobile: request.payload.mobile,
                    empId: request.payload.empId
                })
                contact.save((err, savedContact) => {
                    if (err) {
                        console.log(err)
                        reject(reply(err).code(500));
                    }
                    resolve('Contact saved sucessfuly');
                });
            });
            return promise;
        }
    });
    server.route({
        method: 'GET',
        path: '/contact/{id}',
        handler: function (request, h) {
            const promise = new Promise((resolve, reject) => {
                Contact.findById(request.params.id, function (error, contacts) {
                    if (error) {
                        console.error(error);
                    }
                    resolve(h.view('contactDetails', {
                        contact: contacts
                    }));
                });
            });
            return promise;
        }
    });
    server.route({
        method: 'GET',
        path: '/contacts',
        handler: function (request, h) {
            const promise = new Promise((resolve, reject) => {
                Contact.find(function (error, contacts) {
                    if (error) {
                        console.error(error);
                    }
                    resolve(h.view('showContacts', {
                        contacts: contacts
                    }));
                });
            });
            return promise;
        }
    });
    server.route({
        method: 'DELETE',
        path: '/contact/{id}',
        handler: function (request, reply) {
            const promise = new Promise((resolve, reject) => {
                Contact.deleteOne({
                    _id: request.params.id
                }, function (err, result) {

                    if (err) {
                        reject(err, 'Internal MongoDB error');
                    }
                    if (result.n === 0) {
                        resolve('contact not found');
                    }
                    resolve('contact deleted succussfully');
                });
            });
            return promise;
        }
    });
    server.route({
        method: 'GET',
        path: '/editContact/{id}',
        handler: function (request, h) {
            const promise = new Promise((resolve, reject) => {
                Contact.findById(request.params.id, function (error, contact) {
                    if (error) {
                        console.error(error);
                    }
                    resolve(contact);
                });
            });
            return promise;
        }
    });
    server.route({
        method: 'PUT',
        path: '/updateContact/{id}',
        handler: function (request, reply) {
            const promise = new Promise((resolve, reject) => {
                Contact.updateOne({
                    _id: request.params.id
                }, {
                    $set: request.payload
                }, function (err, result) {

                    if (err) {
                        reject(err, 'Internal MongoDB error');
                    }
                    if (result.n === 0) {
                        resolve('contact not found');
                    }
                    resolve('contact updated succussfully');
                });
            });
            return promise;
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

start();