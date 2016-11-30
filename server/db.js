'use strict';

import mongoose from 'mongoose';

export default async function connectDatabase(config) {
  return new Promise((resolve, reject) => {

    let connection = mongoose.createConnection(config.host || 'localhost', config.dbName);
    connection.on('connected', () => {
      console.log('MongoDB connection opened');
      resolve();
    });

    connection.on('error', err => {
      let msg = `MongoDB connection error: ${err}`;
      console.error(msg);
      reject(msg);
    });

    connection.on('disconnected', () => {
      let msg = 'MongoDB connection disconnected';
      console.error(msg);
      reject(msg);
    });
  });
}
