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
        msg:'无效token'
      }
    )
  }
  next(err)
})

// app.use(function (req, res, next) {
//   // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
//   if (req.url != '/user/login' && req.url != '/user/register') {
//       let token = req.headers.token;
//       let result = verifyToken(token);
//       // 如果考验通过就next，否则就返回登陆信息不正确
//       if (result == 'err') {
//           console.log(result);
//           res.send({status: 403, msg: '登录已过期,请重新登录'});
//       } else {
//           next();
//       }
//   } else {
//       next();
//   }

app.use('/city',routes.city)
app.use('/city',routes.total)
app.use('/goods',routes.goods)
app.use('/user',routes.user)




app.listen(3000,() => {
  console.log('backend running at 3000')
})