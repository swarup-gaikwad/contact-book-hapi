const Contact = require('./models/contact');
const Joi = require('Joi')

module.exports = [{
  method: 'GET',
  path: '/public/{file}',
  handler: function (request, h) {
    return h.file(request.params.file);
  }
}, {
  method: 'GET',
  path: '/',
  handler: function (request, h) {
    return h.view('home');
  }
}, {
  method: 'GET',
  path: '/contact/add',
  handler: function (request, h) {
    return h.view('addContact');
  }
}, {
  method: ['PUT', 'POST'],
  path: '/contact/addContact',
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
          resolve('contact added sucessfully');
        });
      });
      return promise;
    },
    options: {
      validate: {
        payload: {
          fName: Joi.string().required(),
          lName: Joi.string().required(),
          mobile: Joi.string().min(7).max(15),
          empId: Joi.required(),
        }
      }
    }
}, {
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
}, {
  method: 'DELETE',
  path: '/contact/delete/{id}',
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
}, {
  method: 'GET',
  path: '/contact/edit/{id}',
  handler: function (request, h) {
    const promise = new Promise((resolve, reject) => {
      Contact.findById(request.params.id, function (error, contact) {
        if (error) {
          console.error(error);
        }
        resolve(h.view('editContact', {
          contact: contact
        }));
      });
    });
    return promise;
  }
}, {
  method: 'PUT',
  path: '/contact/update/{id}',
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
  },
  options: {
    validate: {
      payload: {
        fName: Joi.string().required(),
        lName: Joi.string().required(),
        mobile: Joi.string().min(7).max(15),
        empId: Joi.required(),
      }
    }
  }
}];