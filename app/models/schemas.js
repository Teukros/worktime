
var orm = require('orm'),
    db = require('orm').db;

var schemas = {
customerScheme: db.define('customers', {
        //synchronized: {type: 'number'},
        //datedeactivated: {type: 'real'},
        id: {type: 'text'},
    //  id:      {type: 'serial', key: true},
        username: {type: 'text'}
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
    })
};
    //
    //
    //
    //
    // schemas.users = {
    //     synchronized: Number,
    //     datedeactivated: Number,
    //     username: String,
    //     password: String,
    //     salutation: Number,
    //     title: Number,
    //     name: String,
    //     surname: String,
    //     phone: String,
    //     email: String
    // },
    //
    // schemas.userdepartmentrel = {
    //     synchronized: Number,
    //     userid: String,
    //     departmentid: String
    // },
    //
    // schemas.departments = {
    //     synchronized: Number,
    //     datedeactivated: Number,
    //     name: String,
    //     startrecording: Number,
    //     endrecording: Number
    // },
    //
    // schemas.holidays = {
    //     synchronized: Number,
    //     datedeactivated: Number,
    //     name: String,
    //     date: Number
    // },
    //
    // schemas.services = {
    //     synchronized: Number,
    //     datedeactivated: Number,
    //     departmentid: String,
    //     name: String,
    //     start: Number,
    //     end: Number,
    //     staff: Number,
    //     holiday: Number,
    //     monday: Number,
    //     tuesday: Number,
    //     wednesday: Number,
    //     thursday: Number,
    //     friday: Number,
    //     saturday: Number,
    //     sunday: Number
    // },
    //
    // schemas.performedservices = {
    //     synchronized: Number,
    //     actualstart: Number,
    //     actualend: Number,
    //     serviceid: String
    // };


module.exports = schemas;
