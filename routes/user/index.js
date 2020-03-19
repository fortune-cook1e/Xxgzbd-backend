const express = require('express')
const router = express.Router()
const { db } = require('../../mysql')
const { success,failure } = require('../../config/msg')


/**
 * @description 注册接口
 */
router.post('/signUp',(req,res,next) => {
  const { username,password } = req.body
  
})


module.exports = router