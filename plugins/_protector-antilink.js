let handler = (m) => m
handler.before = async function(m, { body, isAdmin, isBotAdmin, groupSet }) {
  /** active **/
  if (m.isGroup && groupSet.antilink && !isAdmin && body) {
    if (body.match(/(chat.whatsapp.com)/gi) && !body.includes(await conn.groupInviteCode(m.chat)) || body.match(/(wa.me)/gi)) return conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.key.id,
        participant: m.sender
      }
    }).then(() => conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove'))
  }
  /** nonactive **/
  if (m.isGroup && !groupSet.antilink && !isAdmin && body) {
    if (body.match(/(chat.whatsapp.com)/gi) && !body.includes(await conn.groupInviteCode(m.chat)) || body.match(/(wa.me)/gi)) return conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: m.key.id,
        participant: m.sender
      }
    })
  }
  return true
}

module.exports = handler