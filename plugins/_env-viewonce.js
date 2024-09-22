module.exports = {
  async before(m, { conn, body, isOwner, groupSet, Func }) {
    try {
      if (m.isGroup && m.msg && m.msg.viewOnce && !isOwner && groupSet.viewonce) {
        let media = await conn.downloadMediaMessage(m.msg)
        if (/image/.test(m.mtype)) {
          conn.sendFile(m.chat, media, Func.filename('jpg'), body ? body : '', m)
        } else if (/video/.test(m.mtype)) {
          conn.sendFile(m.chat, media, Func.filename('mp4'), body ? body : '', m)
        }
      }
    } catch (e) {
      console.log(e)
      return conn.reply(m.chat, Func.jsonFormat(e), m)
    }
    return true
  }
}