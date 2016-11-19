const logger = require('koa-logger')

const koa = require('koa');
const app = koa();

app.use(logger());

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);
