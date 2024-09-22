module.exports = {
  run: async (m, { conn, Func }) => {
    try {
      if (!m.quoted) return conn.reply(m.chat, Func.texted('bold', `Reply view once message to use this command.`), m)
      if (m.quoted.message) {
        let type = Object.keys(m.quoted.message)[0]
        let q = m.quoted.message[type]
        let media = await conn.downloadMediaMessage(q)
        if (/video/.test(type)) {
          return await conn.sendFile(m.chat, media, '', q.caption || '', m)
        } else if (/image/.test(type)) {
          return await conn.sendFile(m.chat, media, '', q.caption || '', m)
        }
      } else conn.reply(m.chat, Func.texted('bold', `Stress ??`), m)
    } catch (e) {
      console.log(e)
      return conn.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  help: ['rvo'],
  use: 'reply viewonce',
  tags: ['group'],
  command: /^(rvo|readviewonce)$/i,
  group: true,
  limit: true
}