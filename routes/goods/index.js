const { db } = require('../../mysql')
const express = require('express')
const router = express.Router()
const { success,failure } = require('../../config/msg')




/**
 * @description 添加物资
 */
router.post('/add',async (req,res,next) => {
  let { name,foodType = [],foodInfo,time,phone,area } = req.body
  foodType = foodType.join(',')
  const sql = 'INSERT INTO city_goods(id,name,foodType,foodInfo,time,phone,area) VALUES(0,?,?,?,?,?,?)'
  db.query(
    sql,
    [name,foodType,foodInfo,time,phone,area],
    (err,results,fields) => {
      if(err) {
        console.log(err)
        res.json(err)
      } else {
        res.json(success)
      }
    }
  )
})


/**
 * @description 物品分页查询
 * @params {current,pageSize,startDate,endDate,name} startDate endDate 为必传项
 */
router.get('/list',async (req,res,next) => {
  const { current = 1,pageSize = 10,startDate = '',endDate = '',name = '' } = req.query
  const start  = (current - 1) * pageSize
  let nameSql = ''
  if(name !== null && name !== '') {
    nameSql = ` and name = ?`
  }
  const sql = `SELECT * FROM city_goods where time between ? and ?${nameSql} limit ${start},${pageSize}`
  const totalsql = "SELECT COUNT(id) as total FROM city_goods"
  db.query(
    sql,
    [startDate,endDate,name],
    (err,listResults) => {
      if(err) {
        console.log(err)
        res.json(err)
      } else {
        db.query(
          totalsql,
          (err,totalResults) => {
            const total = totalResults[0].total
            res.json(Object.assign({},success,{data:listResults},{total}))
          }
        )
      }
    }
  )
})

module.exports = router