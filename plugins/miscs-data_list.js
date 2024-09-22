const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta')

module.exports = {
  run: async (m, { conn, command, blockList, isOwner, Func }) => {
    try {
      if (command == 'listprem') {
        const data = Object.entries(global.db.data.users).filter(([_, data]) => data.premium)
        if (data.length == 0) return conn.reply(m.chat, Func.texted('bold', `Empty data.`), m)
        let teks = `乂  *P R E M L I S T*\n\n`
        teks += data.map(([jid, data]) => '	◦ @' + jid.replace(/@.+/, '') + '\n	 *Limit* : ' + Func.formatNumber(data.limit) + '\n	 *Expired* : ' + Func.timeReverse(data.expired - new Date() * 1)).join('\n') + '\n\n'
        teks += global.footer
        conn.sendMessageModify(m.chat, teks, m, {
          ads: false,
          largeThumb: true
        })
      } else if (command == 'listban') {
        const data = Object.entries(global.db.data.users).filter(([_, data]) => data.banned)
        if (data.length == 0) return conn.reply(m.chat, Func.texted('bold', `Empty data.`), m)
        let teks = `乂  *B A N L I S T*\n\n`
        teks += data.map(([jid, _]) => '	◦ @' + jid.replace(/@.+/, '')).join('\n') + '\n\n'
        teks += global.footer
        conn.sendMessageModify(m.chat, teks, m, {
          ads: false,
          largeThumb: true
        })
      } else if (command == 'listblock') {
        if (blockList.length < 1) return m.reply(Func.texted('bold', `Data empty.`))
        let text = `乂 *L I S T B L O C K*\n\n`
        text += blockList.map((v, i) => {
          if (i == 0) {
            return `┌  ◦  @${conn.decodeJid(v).replace(/@.+/, '')}`
          } else if (i == v.length - 1) {
            return `└  ◦  @${conn.decodeJid(v).replace(/@.+/, '')}`
          } else {
            return `│  ◦  @${conn.decodeJid(v).replace(/@.+/, '')}`
          }
        }).join('\n')
        m.reply(text + '\n\n' + global.footer)
      } else if (command == 'listchat') {
        if (!isOwner) return conn.reply(m.chat, global.status.owner, m)
        const data = Object.entries(global.db.data.chats).filter(([jid, _]) => jid.endsWith('.net'))
        if (data.length == 0) return conn.reply(m.chat, Func.texted('bold', `Empty data.`), m)
        let teks = `乂  *C H A T L I S T*\n\n`
        teks += data.sort((a, b) => b[1].lastseen - a[1].lastseen).map(([jid, data]) => '	◦ @' + jid.replace(/@.+/, '') + '\n	    *Chat* : ' + Func.formatNumber(data.chat) + '\n	    *Lastchat* : ' + moment(data.lastseen).format('DD/MM/YY HH:mm:ss')).join('\n') + '\n\n'
        teks += global.footer
        conn.sendMessageModify(m.chat, teks, m, {
          ads: false,
          largeThumb: true
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  help: ['listprem', 'listban', 'listblock', 'listchat'],
  command: /^(list(prem|ban|block|chat))$/i,
  tags: ['miscs']
}