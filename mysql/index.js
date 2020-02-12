const mysql2 = require('mysql2')

const config = {
  host:'localhost',
  user:'root',
  password:"gaoliang199516",
  port:'3306',
  database:'jz-xxgzbd'
}


const db = mysql2.createPool(config)

module.exports = {
  db
}
