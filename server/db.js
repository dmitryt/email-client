'use strict';

import mongoose from 'koa-mongoose';

import models from './models';

export default function connectDatabase(config) {
  return mongoose({
    host: config.host,
    database: config.dbName,
    db: {
      native_parser: true
    },
    server: {
      poolSize: 5
    }
  });
}
