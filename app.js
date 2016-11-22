const logger = require('koa-logger');
const mount = require('koa-mount'); // koa-mount@1.x
const graphqlHTTP = require('koa-graphql');
const koa = require('koa');

const middlewares = require('./server/middlewares');
const graphql = require('./server/graphql');

const app = koa();

app.use(middlewares());
app.use(graphql());

app.listen(3000);
