'use strict';

import convert from 'koa-convert';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';

import schema from './schema';
// import graffiti from '@risingstack/graffiti';
// import { getSchema } from '@risingstack/graffiti-mongoose';

function graphql() {
  const startTime = Date.now();
  const { NODE_ENV } = process.env;
  let isDev = !NODE_ENV || NODE_ENV === 'development';
  return mount('/graphql', convert(graphqlHTTP({
    schema: schema,
    graphiql: true
  })));
}

export default function middleware() {
  return convert.compose(
    logger(),
    bodyParser(),
    graphql()
  );
}
