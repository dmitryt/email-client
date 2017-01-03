'use strict';

import mongoose from 'mongoose';

export default async function connectDatabase(config) {
  return new Promise((resolve, reject) => {
    let host = config.host || 'localhost';
    let dbURI = `mongodb://${host}/${config.dbName}`;
    mongoose.connect(dbURI);
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection opened to: ', dbURI);
      resolve();
    });

    mongoose.connection.on('error', err => {
      let msg = `MongoDB connection error: ${err}`;
      console.error(msg);
      reject(msg);
    });

    mongoose.connection.on('disconnected', () => {
      let msg = 'MongoDB connection disconnected';
      console.error(msg);
      reject(msg);
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
  });
}
