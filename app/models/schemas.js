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
        postalCode: {
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

        customerId: {
            type: 'text',
            "key": true
        },
        settingsValue: {
            type: 'text',
        },
        settingsKey: {
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

        isAdmin: {
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
            type: 'text'
        },

        validFrom: {
            type: 'date'
        },

        validTill: {
            type: 'date'
        },
    }),

    userDepartmentRels: db.define('userDepartmentRels', {

        id: {
            type: 'text',
        },

        customerId: {
            type: 'text'
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

        startRecording: {
            type: 'date'
        },

        endRecording: {
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
            type: 'number'
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

        id: {
            type: 'text',
        },
        customerId: {
            type: 'text'
        },

        dutyTypeId: {
            type: 'text'
        },

        serviceId: {
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

        userId: {
            type: 'text'
        },

        departmentId: {
            type: 'text'
        },

        serviceId: {
            type: 'text'
        },

        dutyTypeId: {
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

        perctoBefore: {
            type: 'date'
        },

        perctoDuring: {
            type: 'date'
        },

        perctoAfter: {
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
            type: 'number'
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
