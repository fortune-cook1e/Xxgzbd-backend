const { db } = require('../../mysql')
const express = require('express')
const router = express.Router()
const {success,failure} = require('../../config/msg')

/**
 * @description 查询city_total表 获取地区所有综合数据
 */
router.get('/total',async (req,res,next) => {
  db.query(
    `select * from city_total`,
    (err,result,fields) => {
      if(err) {
        console.log(3333);
        res.json(failure)
      } else {
        res.json(Object.assign({},success,{data:result}))
      }
    }
  )
})

module.exports = router