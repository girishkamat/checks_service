var log4js = require('log4js');

log4js.configure({
    appenders: {
        checksservice: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['checksservice'],
            level: 'trace'
        }
    }
});

module.exports = log4js