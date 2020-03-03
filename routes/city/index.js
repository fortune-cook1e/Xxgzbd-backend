const { db } = require('../../mysql')
const express = require('express')
const router = express.Router()
const { success } = require('../../config/msg')


router.get('/areas',async (req,res,next) => {
  db.query(
    `SELECT * FROM city`,
    (err,result,fields) => {
      res.json(Object.assign({},success,{data:err}))
    }
  )
})


module.exports = router
