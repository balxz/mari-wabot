let handler = (m) => m
handler.before = async function (m, { conn, body, users, Func }) {
  try {
    let afk = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of afk) {
      let is_user = global.db.data.users[jid]
      if (!is_user) continue
      let afkTime = is_user.afk
      if (!afkTime || afkTime < 0) continue
      let reason = is_user.afkReason || ''
      if (!m.fromMe) {
        conn.reply(m.chat, `*Away From Keyboard* : @${jid.split('@')[0]}\n• *Reason* : ${reason ? reason : '-'}\n• *During* : [ ${Func.toTime(new Date - afkTime)} ]`, m).then(async () => {
          conn.reply(jid, `Someone from *${await (await conn.groupMetadata(m.chat)).subject}*'s group, tagged or mention you.\n\n• *Sender* : @${m.sender.split('@')[0]}`, m).then(async () => {
            await conn.copyNForward(jid, m)
          })
        })
      }
    }
  } catch (e) {
    return conn.reply(m.chat, Func.jsonFormat(e), m)
  }
  return true
}
handler.group = true

module.exports = handler