'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';

export default function middleware() {
  return compose([
    logger(),
    convert(bodyParser())
  ]);
}
