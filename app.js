const logger = require('koa-logger');
const mount = require('koa-mount'); // koa-mount@1.x
const graphqlHTTP = require('koa-graphql');
const koa = require('koa');

const app = koa();

app.use(logger());

app.use(mount('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
})));

app.listen(3000);
