var express = require('express');
var router = express.Router();

const catchError = (asyncFunction) => {
  return (req, res, next) => {
    asyncFunction(req, res, next)
      .catch(error => {
        console.log('錯誤捕捉 =>', error)
        res.status(500).send({
          message: '伺服器錯誤'
        })
      })
  }
}

const errorController = async (req, res, next) => {
  a // 故意製造得 error
  res.send({
    message: '正常狀態'
  })
}

// 獨立 controller
// 錯誤捕捉，回傳 500，server 不會直接 crash
router.get('/', catchError(errorController))

// 沒有 catchError，會直接 crash
router.get('/no-catch', errorController)

module.exports = router;
