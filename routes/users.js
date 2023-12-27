const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// mock key
const key = 'marcoLin'

// mock user data
const users = {
  '123@gmail.com': {
    name: '123',
    password: '123'
  }
}

// 註冊
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password || !name) {
    return res.status(400).send({ error: 'Please enter all fields' })
  }

  if (users[email]) {
    return res.status(400).send({ error: 'User already exists' })
  }

  // 加密密碼
  const hashPassword = await bcrypt.hash(password, 10)

  // 資料儲存
  users[email] = {
    hashPassword,
    userName: name
  }

  // 回應
  return res.status(200).send({ message: 'User created' })

})

// 登入
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({ error: 'Please check your input' })
  }

  // 驗證用戶是否存在
  if (!users[email]) {
    return res.status(401).send({ error: 'User does not exist' })
  }

  // 密碼驗證
  const compareResult = await bcrypt.compareSync(password, users[email].hashPassword)
  if (!compareResult) {
    return res.status(401).send({ error: 'Incorrect password' })
  }

  // JWT 簽章 (key 原則存在環境變數, 產生 token)
  const token = jwt.sign({
    email,
    userName: users[email].userName
  }, key)

  // 回應
  return res.status(200).send({
    message: 'Login success',
    token
  })

})

// 驗證用戶 (同時取得用戶資料)
router.get('/profile', (req, res) => {
  const token = req.headers['authorization']
  
  // 驗證用戶有送
  if (!token) {
    return res.status(401).send({ error: 'unauthorized user' })
  }

  // 進行驗證
  jwt.verify(token, key, (error, payload) => {
    if (error) {
      return res.status(401).send({ error: 'unauthorized user' })
    }

    // 回應
    return res.status(200).send({
      message: 'success',
      user: payload // 這裡的 payload 就是上面的 { email, userName }
    })
  })
  
})

module.exports = router;
