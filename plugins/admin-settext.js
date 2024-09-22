module.exports = {
  run: async (m, { conn, usedPrefix, command, text, participants, Func }) => {
    let setup = global.db.data.groups[m.chat]
    if (command == 'setwelcome') {
      if (!text) return conn.reply(m.chat, formatWel(usedPrefix, command), m)
      setup.sWelcome = text
      await conn.reply(m.chat, Func.texted('bold', `Successfully set.`), m)
    } else if (/set(out|left)/i.test(command)) {
      if (!text) return conn.reply(m.chat, formatLef(usedPrefix, command), m)
      setup.sBye = text
      await conn.reply(m.chat, Func.texted('bold', `Successfully set.`), m)
    }
  },
  help: ['setwelcome', 'setbye'],
  use: 'text',
  tags: ['admin'],
  command: /^(setwelcome|setbye)$/i,
  group: true,
  admin: true
}

const formatWel = (prefix, command) => {
  return `Sorry, can't return without text, and this explanation and how to use :

*1.* +tag : for mention new member on welcome message.
*2.* +grup : for getting group name.

• *Example* : ${prefix + command} Hi +tag, welcome to +grup group, we hope you enjoyed with us.`
}

const formatLef = (prefix, command) => {
  return `Sorry, can't return without text, and this explanation and how to use :

*1.* +tag : for mention new member on left message.
*2.* +grup : for getting group name.

• *Example* : ${prefix + command} Good by +tag`
}