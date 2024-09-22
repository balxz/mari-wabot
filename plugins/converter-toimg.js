const { readFileSync: read, unlinkSync: remove } = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { tmpdir } = require('os')

module.exports = {
  run: async (m, { conn, Func }) => {
    try {
      if (!m.quoted) return conn.reply(m.chat, Func.texted('bold', `Reply to sticker you want to convert to an image/photo (not supported for sticker animation).`), m)
      if (m.quoted.mimetype != 'image/webp') return conn.reply(m.chat, Func.texted('bold', `Reply to sticker you want to convert to an image/photo (not supported for sticker animation).`), m)
      m.react('🕒')
      let media = await conn.saveMediaMessage(m.quoted)
      let file = Func.filename('png')
      let isFile = path.join(tmpdir(), file)
      exec(`ffmpeg -i ${media} ${isFile}`, (err, stderr, stdout) => {
        remove(media)
        if (err) return conn.reply(m.chat, Func.texted('bold', `Conversion failed.`), m)
        const buffer = read(isFile)
        conn.sendFile(m.chat, buffer, '', '', m)
        remove(isFile)
      })
    } catch (e) {
      console.log(e)
      return conn.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  help: ['toimg'],
  use: 'reply sticker',
  tags: ['converter'],
  command: /^(to?(img|image))$/i,
  limit: true
}