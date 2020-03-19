const { db } = require('../../mysql')
const express = require('express')
const router = express.Router()
const {success,failure} = require('../../config/msg')

/**
 * @description 查询city_total表 获取地区所有综合数据
 */
router.get('/total',async (req,res,next) => {
  const sqlSearch = 'select * from city_total'
  const [rows,fields] = await db.execute(sqlSearch)
  if(rows) {
    res.json(Object.assign(
      {},
      success,
      {data:rows}
    ))
  } else {
    res.json(Object.assign(
      {},
      failure,
      {data:rows}
    ))
  }
})

module.exports = router