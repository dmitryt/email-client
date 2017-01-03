#!/usr/local/bin/node
var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var faker = require('faker');
var mongoose = require('mongoose');
// var fakery = require('mongoose-fakery');
// var fixtures = require('node-mongoose-fixtures');
var loadFixture = require('mongoose-fixture-loader');

import config from 'config';
import models from './server/models';
import dbMd from './server/db';

function _generateUsers(num) {
  var result = [];
  var sex;
  for (var i = 0; i< num; i++) {
    sex = faker.helpers.randomize(['m', 'f']);
    result.push({
        sex: sex,
        firstName: faker.name.firstName( sex === 'm' ? 0 : 1),
        lastName: faker.name.lastName(),
        age: faker.random.number({ min: 20, max: 100 }),
        email: faker.internet.email()
    });
  }
  return result;
}

function genUserId(usersLength) {
  return Math.floor(Math.random() * usersLength);
}

function genReceiverIds(count, usersLength, senderId) {
  var result = [];
  while(count-- > 0) {
    var userId = null;
    while (!userId || userId === senderId) {
      userId = genUserId(usersLength);
    }
    result.push(userId);
  }
  return result;
}

function _generateEmails(num, users) {
  var result = [];
  var type, status, receivers, senderId, sender;
  for (var i = 0; i< num; i++) {
    type = faker.helpers.randomize(['social', 'promo', 'notification']);
    status = faker.helpers.randomize(['unread', 'important']);
    senderId = genUserId(users.length);
    sender = users[senderId];
    receivers = genReceiverIds(3, users.length, senderId)
      .map(function(id) {
        var user = users[id];
        return {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          category: type,
          isDeleted: faker.helpers.randomize([true, false]),
          isImportant: faker.helpers.randomize([true, false]),
        }
      });
    result.push({
        id: i + 1,
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        sender: {
          email: sender.email,
          firstName: sender.firstName,
          lastName: sender.lastName
        },
        receivers: receivers
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

function clearAll() {
  return new Promise(function(resolve, reject) {
    models.Email.remove({}, function() {
      models.User.remove({}, function() {
        resolve();
      });
    });
  });
}

function main() {
  var users = _generateUsers(20);
  var emails = _generateEmails(100, users);
  dbMd(config.get('db')).then(function() {
    clearAll().then(function() {
      console.log('DB has been cleared successfully');
      loadFixture(models.User, users)
        .then(function() {
          console.log('Users have been uploaded successfully');
          loadFixture(models.Email, emails)
          .then(function() {
            console.log('Emails have been uploaded successfully');
            process.exit(0);
          })
          .catch(function(err) {
            console.error(err);
          });
        })
        .catch(function(err) {
          console.error(err);
        });
        // fixtures({
        //   emails: emails
        // }, conn, function(err, data) {
        //   if (err) {
        //     console.error(err);
        //   } else {
        //     console.error('Data was saved successfully');
        //   }
        // });
    });
  })
  .catch(function(err) {
    console.error(err);
  });
}

main();
