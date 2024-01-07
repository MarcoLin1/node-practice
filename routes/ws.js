const Websocket = require('ws')
const uuidV4 = require('uuid').v4

const wss1 = new Websocket.WebSocketServer({ noServer: true })

wss1.on('connection', (ws) => {
  ws.on('error', (error) => {
    console.log(error)
  })
  console.log('connection successful')
  const uuid = uuidV4()
 
  ws.uuid = uuid // 判斷是哪一個用戶

  // 發出訊息給用戶
  const user = {
    context: 'user',
    uuid
  }
  ws.send(JSON.stringify(user))

  // 監聽用戶訊息
  ws.on('message', (res) => {
    const data = JSON.parse(res)
    const newMessage = {
      context: 'message',
      uuid,
      message: data.message
    }
    // 直接回傳 只寄給自己
    // ws.send(JSON.stringify(newMessage))

    // 寄給其他人
    broadcast(newMessage)
  })
})

function broadcast (message) {
  wss1.clients.forEach((client) => {
    // 已建立連線，並且排除自身
    if (client.readyState === Websocket.OPEN && client.uuid !== message.uuid) {
      client.send(JSON.stringify(message))
    }
  })
}

module.exports = wss1