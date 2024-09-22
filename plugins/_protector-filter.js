let handler = (m) => m
handler.before = async function before(m, { body, users, groupSet, setting, isAdmin, isBotAdmin, Func }) {
  try {
    if (m.isGroup && groupSet.filter && !isAdmin && !m.fromMe) {
      let toxic = setting.toxic
      if (body && (new RegExp('\\b' + toxic.join('\\b|\\b') + '\\b')).test(body.toLowerCase())) {
        groupSet.member[m.sender].warning += 1
        let warning = groupSet.member[m.sender].warning
        if (warning > 4) return conn.reply(m.chat, Func.texted('bold', `Warning : [ 5 / 5 ], Sayonaraa ~~`), m).then(() => {
          conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove').then(async () => {
            groupSet.member[m.sender].warning = 0
              conn.sendMessage(m.chat, {
                delete: {
                  remoteJid: m.chat,
                  fromMe: isBotAdmin ? false : true,
                  id: m.key.id,
                  participant: m.sender
                }
              })
          })
        })
        return conn.reply(m.chat, `*[ WARNING ]*\n\nYou got warning : [ ${warning} / 5 ]\n\If you get 5 warnings you will be kicked automatically from the group.`, m).then(() => conn.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: isBotAdmin ? false : true,
            id: m.key.id,
            participant: m.sender
          }
        }))
      }
    }
  } catch (e) {
    return conn.reply(m.chat, Func.jsonFormat(e), m)
  }
  return true
}
handler.botAdmin = true

module.exports = handler