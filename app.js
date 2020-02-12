const express =  require('express')
const app = express()
const routes = require('./routes')

// 允许跨域
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


// 处理异常
app.use((err,req,res,next) => {
  next(err)
})

app.use('/city',routes.city)


app.listen(3000,() => {
  console.log('backend running at 3000')
})