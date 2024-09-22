const axios = require('axios')

module.exports = {
  run: async (m, { conn, usedPrefix, command, text, setting, Func }) => {
    if (!text) return conn.reply(m.chat, Func.example(usedPrefix, command, 'Hi!'), m)
    try {
      pic = await conn.profilePictureUrl(m.quoted ? m.quoted.sender : m.sender, 'image')
    } catch (e) {
      pic = 'https://telegra.ph/file/32ffb10285e5482b19d89.jpg'
    } finally {
      m.react('🕐')
      const json = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#0C0C0C",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
          "entities": [],
          "avatar": true,
          "from": {
            "id": 1,
            "name": m.quoted ? m.quoted.name : m.name,
            "photo": {
              "url": pic
            }
          },
          "text": text,
          "replyMessage": {}
        }]
      }
      const response = await axios.post('https://bot.lyo.su/quote/generate', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const buffer = Buffer.from(response.data.result.image, 'base64')
      conn.sendSticker(m.chat, buffer, m, {
        packname: setting.sk_pack,
        author: setting.sk_author
      })
    }
  },
  help: ['qc'],
  use: 'text',
  tags: ['converter'],
  command: /^(qc)$/i,
  limit: true
}