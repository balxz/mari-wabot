module.exports = {
  run: async (m, { conn, isBotAdmin }) => {
    if (!m.quoted) return
    conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: isBotAdmin ? false : true,
        id: m.quoted.id,
        participant: m.quoted.sender
      }
    })
  },
  help: ['delete'],
  use: 'reply chat',
  tags: ['group'],
  command: /^(del|delete)$/i,
  group: true
}