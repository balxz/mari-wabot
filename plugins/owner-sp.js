module.exports = {
   run: async (m, { conn, usedPrefix, command, text, Func }) => {
      try {
         if (!text) return conn.reply(m.chat, `where is the path?\n\nexample:\n${usedPrefix + command} plugins/menu.js`, m)
         if (!m.quoted.text) return conn.reply(m.chat, `reply code`, m)
         let path = `${text}`
         await require('fs').writeFileSync(path, m.quoted.text)
         m.reply(`Saved ${path} to file!`)
      } catch (e) {
         console.log(e)
      }
   },
   help: ['sp'],
   use: 'reply code',
   tags: ['owner'],
   command: /^(sp|savepath)$/i,
   owner: true
}