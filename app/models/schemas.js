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

        customerId: {
            type: 'text',
        }
    }),

    userDepartmentRels: db.define('userDepartmentRels', {
        id: {
            type: 'text',
            "key": true
        },
        customerId: {
            type: 'text'
        },

        dateDeactivated: {
            type: 'date'
        },

        lastModified: {
            type: 'date'
        },

        userId: {
            type: 'text',
        },

        departmentId: {
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

        customerId: {
            type: 'text'
        },

    }),

    holidays: db.define('holidays', {
        id: {
            type: 'text',
            "key": true
        },
        customerId: {
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
        customerId: {
            type: 'text'
        },
        dateDeactivated: {
            type: 'date'
        },

        lastModified: {
            type: 'date'
        },

        departmentId: {
            type: 'text'
        },

        name: {
            type: 'text'
        },

        start: {
            type: 'date'
        },

        end: {
            type: 'date'
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
        customerId: {
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
        customerId: {
            type: 'text'
        },

        lastModified: {
            type: 'date'
        },

        dutytypeid: {
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
        customerId: {
            type: 'text'
        },

        dateDeactivated: {
            type: 'date'
        },

        lastModified: {
            type: 'date'
        },

        actualStart: {
            type: 'date'
        },

        actualEnd: {
            type: 'date'
        },

        userId: {
            type: 'text'
        },

        serviceId: {
            type: 'text'
        },

        dutyTypeId: {
            type: 'text'
        },

        secsBefore: {
            type: 'number'
        },

        secsDuring: {
            type: 'number'
        },

        secsAfter: {
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
        customerId: {
            type: 'text'
        },
        dateDeactivated: {
            type: 'date'
        },

        lastModified: {
            type: 'date'
        },

        serviceId: {
            type: 'text'
        },

        start: {
            type: 'date'
        },

        end: {
            type: 'date'
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
