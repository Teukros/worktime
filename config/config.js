var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'genmvc'
    },
    port: 3000,
    db: 'mysql://user:password@localhost/mydb'
  },

  test: {
    root: rootPath,
    app: {
      name: 'genmvc'
    },
    port: 3000,
    db: 'mysql://root@localhost/genmvc_test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'genmvc'
    },
    port: 3000,
    db: 'mysql://root@localhost/genmvc_production'
  }
};

module.exports = config[env];
