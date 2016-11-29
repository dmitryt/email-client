import 'babel-polyfill';

import mongoose from 'mongoose';
import logger from 'koa-logger';
import middleware from 'koa-router';
import parser from 'koa-bodyparser';
import Koa from 'koa';

import config from 'config';

// import db from './server/db';
// import middlewares from './server/middlewares';
// import graphql from './server/graphql';

const dbConfig = config.get('db');
const app = new Koa();

// app.use(db(dbConfig));
// app.use(middlewares());
app.use(logger());
app.use(
  async (ctx, next) => ctx.body = 'Hello World'
);

app.on('error', err => {
  console.error(err);
});

app.listen(3000);
