const mysql2 = require('mysql2')

const config = {
  host:'122.51.218.64',
  user:'www_api_fortunec',
  password:"wEkdM38rywiXL7s6",
  port:'3306',
  database:'www_api_fortunec'
}


const db = mysql2.createPool(config)

module.exports = {
  db
}
