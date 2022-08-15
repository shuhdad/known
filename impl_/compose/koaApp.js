const koa = require("koa")
let app = new koa()

const compose = require("../index")
let md1 = async (ctx, next) => {
    console.log("1")
    await next();
    console.log("1 - next")
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
}
let md2 = async (ctx, next) => {
    const start = Date.now();
    console.log("2")
    await next();
    console.log("2 - next")
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
}
let md3 = async ctx => {
    console.log("3")
    ctx.body = 'Hello World';
}
let comp = compose([md1, md2, md3])
// x-response-time
app.use(comp);


app.listen(4002)