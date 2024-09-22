module.exports = {
  run: async (m, { conn, isOwner, text, isAdmin, Func }) => {
    let who
    if (m.isGroup) {
      if (!(isAdmin || isOwner)) {
        m.reply(global.status.admin)
        throw false
      }
      if (isOwner) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
      who = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    } else {
      if (!isOwner) {
        m.reply(global.status.owner)
        throw false
      }
      who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    }
    try {
      if (who.endsWith('g.us')) global.db.data.groups[who].isBanned = false
      else global.db.data.users[who].banned = false
      m.reply(`Done Unban! Bot aktif dichat ${await conn.getName(who) == undefined ? 'ini' : await conn.getName(who)}.`)
    } catch (e) {
      console.log(e)
      return m.reply(Func.jsonFormat(e))
    }
  },
  help: ['unbanned'],
  use: 'mention or reply',
  tags: ['owner'],
  command: /^(unbanned|unban|unbanchat)$/i,
  owner: true
}