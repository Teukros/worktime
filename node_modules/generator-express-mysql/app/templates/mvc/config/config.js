var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: '<%= _.underscored(_.slugify(appname)) %>'
    },
    port: 3000,
    db: 'mysql://root@localhost/<%= _.underscored(_.slugify(appname)) %>_development'
  },

  test: {
    root: rootPath,
    app: {
      name: '<%= _.slugify(appname) %>'
    },
    port: 3000,
    db: 'mysql://root@localhost/<%= _.underscored(_.slugify(appname)) %>_test'
  },

  production: {
    root: rootPath,
    app: {
      name: '<%= _.slugify(appname) %>'
    },
    port: 3000,
    db: 'mysql://root@localhost/<%= _.underscored(_.slugify(appname)) %>_production'
  }
};

module.exports = config[env];
