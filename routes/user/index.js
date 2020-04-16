const express = require('express')
const router = express.Router()
const { db } = require('../../mysql')
const { success,failure } = require('../../config/msg')
const { generateToken,vertifyToken }  = require('../../utils/jwt')


/**
 * @description 注册接口
 */
router.post('/register',async (req,res,next) => {
  try {
    const { username,password } = req.body
    const findSql = `select * from city_user where username = ?`
    const createSql = `insert into city_user(id,username,password) values(0,?,?)`
    const [rows,fields] = await db.execute(findSql,[username])
    // 如果没注册过则注册
    if(rows.length === 0) {
      await db.execute(createSql,[username,password])
      res.json(
        Object.assign(
          {},
          success,
          {msg:'注册成功'}
        )
      )
    } else {
      res.json(
        Object.assign(
          {},
          failure,
          {msg:'username has been register'}
        )
      )
    }
  } catch(e) {
    console.log(e);
    res.json(
      Object.assign(
        {},
        failure,
        {msg:e.message}
      )
    )
  }
})

/**
 * @description 登录成功后下发token
 */
router.post('/login',async (req,res,next) => {
  try {
    const { username,password } = req.body
    const findSql = 'SELECT * FROM city_user WHERE username = ? and password = ?'
    const [rows, fields] = await db.execute(findSql,[username,password])
    if (rows.length > 0) {
      let result = rows[0]
      let id = result.id
      let token = generateToken(id) // 根据id生成token返回给前端
      res.json(
        Object.assign(
          {},
          success,
          {
            token:token
          }
        )
      )
    } else {
      res.json(
        Object.assign(
          {},
          failure,
          {msg:'没有该用户'}
        )
      )
    }
  } catch(e) {
    console.log(e);
    res.json(
      Object.assign(
        {},
        failure,
        {msg:e.message}
      )
    )
  }
})


module.exports = router