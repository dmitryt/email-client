import 'babel-polyfill';

import mongoose from 'mongoose';
import logger from 'koa-logger';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import Koa from 'koa';

import config from 'config';

import db from './server/db';
import middlewares from './server/middlewares';

const app = new Koa();
const router = new Router();
const dbConfig = config.get('db');
const port = config.get('port');

db(dbConfig)
  .then(() => {
    app.use(middlewares());
    app.on('error', err => {
      console.error(err);
    });
    app.listen(port, () => {
      console.log(`Listening on port ${config.get('port')}`);
    });
  });
