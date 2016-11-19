#!/usr/local/bin/node
var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var faker = require('faker');
var FOLDER4SAVE = 'fixtures';

function _generateUsers(num) {
  var result = [];
  var sex;
  for (var i = 0; i< num; i++) {
    sex = faker.helpers.randomize(['m', 'f']);
    result.push({
        id: i + 1,
        sex: sex,
        firstName: faker.name.firstName( sex === 'm' ? 0 : 1),
        lastName: faker.name.lastName(),
        age: faker.random.number({ min: 20, max: 100 }),
        email: faker.internet.email()
    });
  }
  return result;
}

function _generateEmails(num) {
  var result = [];
  var type, status, receivers;
  for (var i = 0; i< num; i++) {
    type = faker.helpers.randomize(['social', 'promo', 'notification']);
    status = faker.helpers.randomize(['unread', 'important']);
    receivers = [];
    for (var j = 0; j < 3; j++) {
      receivers.push(faker.internet.email());
    }
    result.push({
        id: i + 1,
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        sender: faker.internet.email(),
        receivers: receivers,
        type: type,
        status: status
    });
  }
  return result;
}

function save(data, fpath) {
  fs.writeFile(path.join(FOLDER4SAVE, fpath), JSON.stringify(data), 'utf8', function(err) {
    if(err) {
      return console.error(err);
    }
    console.log("The file was saved!");
  });
}

function main() {
  var num = argv.n || 10;
  var ufile = argv.ufile;
  var efile = argv.efile;
  var data = _generateUsers(num);
  if (ufile) {
    save(data, ufile);
  }
  var data = _generateEmails(num);
  if (efile) {
    save(data, efile);
  }
  return data;
}

main();
