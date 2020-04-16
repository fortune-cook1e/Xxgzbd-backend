const express =  require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes')
const { verifyToken } = require('./utils/jwt')
const path = require('path')
const fs = require('fs')
const expressJwt = require('express-jwt')

function resolve(dir) {
  return path.join(__dirname,dir)
}

// 公钥解密
const privateToken = fs.readFileSync(resolve('./rsa_key/rsa_public_key.pem'))



// CORS 跨域
app.all('*',function(req,res,next) {
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
  if(req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

// 解析post请求
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:false
}))

app.use(expressJwt({
  secret: privateToken   
}).unless({
  path: ['/user/login','/user/register']  //除了这些地址，其他的URL都需要验证
}));

// 处理异常
app.use((err,req,res,next) => {
  if(err.name === 'UnauthorizedError') {
    res.json(
      {
        code:401,
        status:0,
        msg:'token已失效'
      }
    )
  }
  next(err)
})


app.use('/city',routes.city)
app.use('/city',routes.total)
app.use('/goods',routes.goods)
app.use('/user',routes.user)




app.listen(3000,() => {
  console.log('backend running at 3000')
})