'use strict';

const { Service } = require('zenweb');

class DemoService extends Service {
  sayHello() {
    return 'Hello';
  }
}

module.exports = DemoService;
