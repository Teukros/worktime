var orm = require('orm'),
    db = require('orm').db;

var schemas = {
    customers: db.define('customers', {
        //synchronized: {type: 'number'},
        //datedeactivated: {type: 'real'},
        id: {
            type: 'text',
            "key": true
        },
        //  id:      {type: 'serial', key: true},
        username: {
            type: 'text'
        }
        // password: {type: 'text'},
        // company: {type: 'text'},
        // salutation: {type: 'number'},
        // title: {type: 'number'},
        // name: {type: 'text'},
        // surname: {type: 'text'},
        // position: {type: 'text'},
        // department: {type: 'text'},
        // address: {type: 'text'},
        // postalcode: {type: 'text'},
        // city: {type: 'text'},
        // state: {type: 'text'},
        // phone: {type: 'text'},
        // email: {type: 'text'}
    }),

    users: db.define('users', {

        datedeactivated: {
            type: 'date'
        },

        lastmodified: {
            type: 'date'
        },

        username: {
            type: 'text'
        },

        password: {
            type: 'text'
        },

        isadmin: {
            type: 'number'
        },

        salutation: {
            type: 'number'
        },

        title: {
            type: 'number'
        },

        name: {
            type: 'text'
        },

        surname: {
            type: 'text'
        },

        position: {
            type: 'text'
        },

        phone: {
            type: 'text'
        },

        email: {
            type: 'text'
        },

        customerid: {
            type: 'text',
            "key": true
        }
    })
};

module.exports = schemas;
