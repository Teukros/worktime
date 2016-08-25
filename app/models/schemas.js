var orm = require('orm'),
    db = require('orm').db;

var schemas = {
    customers: db.define('customers', {
        dateDeactivated: {
            type: 'date'
        },
        id: {
            type: 'text',
            "key": true
        },
        lastModified: {
            type: 'date'
        },
        company: {
            type: 'text'
        },
        department: {
            type: 'text'
        },
        address: {
            type: 'text'
        },
        postalcode: {
            type: 'text'
        },
        city: {
            type: 'text'
        },
        state: {
            type: 'text'
        }
    }),

    settings: db.define('settings', {

        customerid: {
            type: 'text',
            "key": true
        },
        settingsvalue: {
            type: 'text',
        },
        settingskey: {
            type: 'text',
        }
    }),

        users: db.define('users', {

        id: {
            type: 'text',
            "key": true
        },

        dateDeactivated: {
            type: 'date'
        },

        lastModified: {
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
        }
    }),

    userDepartmentRels: db.define('userDepartmentRels', {
        id: {
            type: 'text',
            "key": true
        },
        customerid: {
            type: 'text'
        },

        dateDeactivated: {
            type: 'date'
        },

        lastModified: {
            type: 'date'
        },

        userid: {
            type: 'text',
        },

        departmentid: {
            type: 'text',
        },

    }),



    departments: db.define('departments', {
        id: {
            type: 'text',
            "key": true
        },
        dateDeactivated: {
            type: 'date'
        },

        lastModified: {
            type: 'date'
        },

        name: {
            type: 'text'
        },

        startrecording: {
            type: 'date'
        },

        endrecording: {
            type: 'date'
        },

        customerid: {
            type: 'text'
        },

    }),

    holidays: db.define('holidays', {
        id: {
            type: 'text',
            "key": true
        },
        customerid: {
            type: 'text'
        },
        dateDeactivated: {
            type: 'date'
        },

        lastModified: {
            type: 'date'
        },

        name: {
            type: 'text'
        },

        date: {
            type: 'date'
        },
        state: {
            type: 'number'
        }
    }),

    services: db.define('services', {
        id: {
            type: 'text',
            "key": true
        },
        customerid: {
            type: 'text'
        },
        dateDeactivated: {
            type: 'date'
        },

        lastModified: {
            type: 'date'
        },

        departmentid: {
            type: 'text'
        },

        name: {
            type: 'text'
        },

        start: {
            type: 'date'
        },

        duration: {
            type: 'number'
        },

        staff: {
            type: 'number'
        },

        holiday: {
            type: 'number'
        },

        monday: {
            type: 'number'
        },

        tuesday: {
            type: 'number'
        },

        wednesday: {
            type: 'number'
        },

        thursday: {
            type: 'number'
        },

        friday: {
            type: 'number'
        },

        saturday: {
            type: 'number'
        },

        sunday: {
            type: 'number'
        },

    }),

    dutyTypes: db.define('dutyTypes', {
        id: {
            type: 'text',
            "key": true
        },
        customerid: {
            type: 'text'
        },
        dateDeactivated: {
            type: 'date'
        },

        lastModified: {
            type: 'date'
        },

        name: {
            type: 'text'
        },

    }),

    dutyTypeServiceRels: db.define('dutyTypeServiceRels', {

        dateDeactivated: {
            type: 'date'
        },
        customerid: {
            type: 'text'
        },

        lastModified: {
            type: 'date'
        },

        dutyTypeid: {
            type: 'text'
        },

        serviceid: {
            type: 'text'
        },

    }),

    performedServices: db.define('performedServices', {
        id: {
            type: 'text',
            "key": true
        },
        customerid: {
            type: 'text'
        },

        dateDeactivated: {
            type: 'date'
        },

        lastModified: {
            type: 'date'
        },

        scheduledStart: {
            type: 'date'
        },

        actualStart: {
            type: 'date'
        },

        duration: {
            type: 'number'
        },

        isHoliday: {
            type: 'number'
        },

        leadInMinutes: {
            type: 'number'
        },

        leadOutMinutes: {
            type: 'number'
        },

        userid: {
            type: 'text'
        },

        serviceid: {
            type: 'text'
        },

        dutyTypeid: {
            type: 'text'
        },

        minsBefore: {
            type: 'number'
        },

        minsDuring: {
            type: 'number'
        },

        minsAfter: {
            type: 'number'
        },

        percToBefore: {
            type: 'date'
        },

        percToDuring: {
            type: 'date'
        },

        percToAfter: {
            type: 'date'
        },

    }),

    schedules: db.define('schedules', {
        id: {
            type: 'text',
            "key": true
        },
        customerid: {
            type: 'text'
        },
        dateDeactivated: {
            type: 'date'
        },

        lastModified: {
            type: 'date'
        },

        serviceid: {
            type: 'text'
        },

        start: {
            type: 'date'
        },

        duration: {
            type: 'number'
        },

        staff: {
            type: 'number'
        },
        date: {
            type: 'date'
        },

    }),



};

module.exports = schemas;
