const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

const crossDomain = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Expose-Headers')
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, HEAD')
  ctx.set('Content-Type', 'application/json charset=utf-8')
  ctx.status = 200

  await next()
}

const Router = require('koa-router')
const router = new Router()

router.post('/auth/login', async (ctx, next) => {
  ctx.body = {
    code: 200,
    message: 'success',
    data: {
      username: 'zhaoyiming',
      age: 18,
      token: Math.random()
    }
  }
})

app.use(crossDomain)
app.use(bodyParser())
app.use(router.routes(), router.allowedMethods()) 

app.listen(8092, () => {
  console.log('application listen port 8092')
})