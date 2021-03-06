const mount = require('koa-mount');
const app = new (require('koa'));
const rpcClient = require('./client');
const template = require('../utils/template');

const detailTemplate = template(__dirname + '/template/index.html');

app.use(async (ctx) => {
  if (!ctx.query.columnid) {
    // ctx.status = 400;
    // ctx.body = 'invalid columnid';
    ctx.redirect('/detail?columnid=1');
    return;
  }

  const result = await new Promise((resolve, reject) => {
    rpcClient.write({
      columnid: ctx.query.columnid
    }, function (err, data) {
      err ? reject(err) : resolve(data)
    })
  });

  ctx.status = 200;
  ctx.body = detailTemplate(result);
})

module.exports = app;
