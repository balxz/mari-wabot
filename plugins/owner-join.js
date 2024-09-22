module.exports = {
  run: async (m, { conn, usedPrefix, command, args, Func }) => {
    try {
      if (!args || !args[0]) return conn.reply(m.chat, Func.example(usedPrefix, command, 'https://chat.whatsapp.com/codeInvite'), m)
      let link = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
      let [_, code] = args[0].match(link) || []
      if (!code) return conn.reply(m.chat, global.status.invalid, m)
      let id = await conn.groupAcceptInvite(code)
      if (!id.endsWith('g.us')) return conn.reply(m.chat, Func.texted('bold', `Sorry i can't join to this group :(`), m)
      let member = await (await conn.groupMetadata(id)).participants.map(v => v.id)
      return conn.reply(m.chat, `Joined!`, m)
    } catch {
      return conn.reply(m.chat, Func.texted('bold', `Sorry i can't join to this group :(`), m)
    }
  },
  help: ['join'],
  use: 'group link',
  tags: ['owner'],
  command: /^(join)$/i,
  owner: true
}