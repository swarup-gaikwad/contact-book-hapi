'use strict';

const Contact = require('./models/contact');

module.exports = {
  add: (request, h) => {
    const promise = new Promise((resolve, reject) => {
      const contact = new Contact({
        fName: request.payload.fName,
        lName: request.payload.lName,
        mobile: request.payload.mobile,
        empId: request.payload.empId
      });
      contact.save((err, savedContact) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(h.redirect('/contacts'));
      });
    });
    return promise;
  },
  fetch: (request, h) => {
    const promise = new Promise((resolve, reject) => {
      Contact.find((error, contacts) => {
        if (error) {
          console.error(error);
        }
        resolve(h.view('showContacts', {
          contacts: contacts,
          hasContacts: contacts.length === 0
        }));
      });
    });
    return promise;
  },
  delete: (request, h) => {
    const promise = new Promise((resolve, reject) => {
      Contact.deleteOne({
        _id: request.params.id
      }, (err, result) => {
        if (err) {
          reject(err, 'Internal MongoDB error');
        }
        if (result.n === 0) {
          reject(new Error('contact not found'));
        }
        resolve('contact deleted succussfully');
      });
    });
    return promise;
  },
  edit: (request, h) => {
    const promise = new Promise((resolve, reject) => {
      Contact.findById(request.params.id, (error, contact) => {
        if (error) {
          console.error(error);
        }
        resolve(h.view('editContact', {
          contact: contact
        }));
      });
    });
    return promise;
  },
  update: (request, h) => {
    const promise = new Promise((resolve, reject) => {
      Contact.updateOne({
        _id: request.params.id
      }, {
        $set: request.payload
      }, (err, result) => {
        if (err) {
          reject(err, 'Internal MongoDB error');
        }
        if (result.n === 0) {
          reject(new Error('contact not found'));
        }
        resolve('contact updated');
      });
    });
    return promise;
  },
  mobileUpdate: (request, h) => {
    const promise = new Promise((resolve, reject) => {
      Contact.updateOne({
        _id: request.params.id
      }, {
        $set: request.payload
      }, (err, result) => {
        if (err) {
          reject(err, 'Internal MongoDB error');
        }
        resolve('contact updated');
      });
    });
    return promise;
  }
};
