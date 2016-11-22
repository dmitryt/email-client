import { getSchema } from '@risingstack/graffiti-mongoose';
import graffiti from '@risingstack/graffiti';
import compose from 'koa-compose';
import convert from 'koa-convert';

import Models from './models';

export const schema = getSchema(Models);
export const graphiql = true;

export default function graphql() {
  return compose([
    convert(graffiti.koa({
      schema,
      graphiql,
    })),
  ]);
}
