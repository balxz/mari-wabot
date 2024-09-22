module.exports = {
  run: async (m, { conn, usedPrefix, command, text, participants, Func }) => {
    let value = m.quoted ? m.quoted.text : text
    if (command == 'setname') {
      if (!value) return conn.reply(m.chat, Func.example(usedPrefix, command, 'CHATBOT'), m)
      if (value > 25) return conn.reply(m.chat, Func.texted('bold', `Text is too long, maximum 25 character.`), m)
      await conn.groupUpdateSubject(m.chat, value)
    } else if (command == 'setdesc') {
      if (!value) return conn.reply(m.chat, Func.example(usedPrefix, command, `Follow the rules if you don't want to be kicked.`), m)
      await conn.groupUpdateDescription(m.chat, value)
    }
  },
  help: ['setdesc', 'setname'],
  use: 'text',
  tags: ['admin'],
  command: /^(setdesc|setname)$/i,
  group: true,
  admin: true,
  botAdmin: true
}