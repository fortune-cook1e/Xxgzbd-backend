
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

function resolve(dir) {
  return path.join(__dirname,dir)
}


/**
 * @description 生成token
 */
function generateToken(data) {
  let created = Math.floor(Date.now() / 1000) + 60 * 30
  let cert = fs.readFileSync(resolve('../rsa_key/rsa_private_key.pem'))  // 私钥
  let token = jwt.sign(
    {
      exp:created,
      data
    },
    cert,
    {algorithm: 'RS256'}
  )
  return token
}

/**
 * @description 校验token
 */
function vertifyToken(data) {
  let token = data
  let cert = fs.readFileSync(resolve('../rsa_key/rsa_public_key.pem')); // 公钥
  let res
   try {
    let result = jwt.verify(token,cert,{algorithms: ['RS256']})
    let { exp = 0 } = result
    let current = Math.floor(Date.now() / 1000)
    if (current <= exp) {
      res = result.data
    }
   } catch (e) {
     res = new Error('error')
   }
}

module.exports = {
  generateToken,
  vertifyToken
}