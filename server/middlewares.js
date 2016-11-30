'use strict';

import convert from 'koa-convert';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';
import MTGQL from 'mongoose-schema-to-graphql';

import { User, Email } from './models';

function getGraphqlSchema(args = {}) {
  let config = {
    name: args.name,
    description: args.description,
    class: 'GraphQLObjectType',
    schema: args.schema,
    exclude: ['_id']
  };
  return MTGQL(config);
}

export function graphql() {
  const startTime = Date.now();
  return mount('/graphql', convert(graphqlHTTP({
    schema: getGraphqlSchema({ schema: User, name: 'user', description: 'User Schema' }),
    extensions({ document, variables, operationName, result }) {
      return { runTime: Date.now() - startTime };
    },
    graphiql: true
  })));
}

export default function middleware() {
  return convert.compose(
    logger(),
    bodyParser(),
    // graphql()
  );
}
