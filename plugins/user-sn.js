const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function(m, { conn, text, usedPrefix }) {
  let __waktutionskh = new Date() - db.data.users[m.sender].snlast
  let _waktutionskh = +86400000 - __waktutionskh
  let waktutionskh = clockString(_waktutionskh)
  /* if (new Date() - db.data.users[m.sender].snlast > +86400000) {
    db.data.users[m.sender].snlast = new Date() * 1
    db.data.users[m.sender].limit -= 5 */
    let sn = createHash('md5').update(m.sender).digest('hex')
    let btns = [{
      name: 'cta_copy',
      buttonParamsJson: JSON.stringify({
        display_text: 'copy sn',
        id: `123456789`,
        copy_code: sn
      })
  }] 
  conn.sendIAMessage(m.chat, btns, m, { 
    content: 'Please copy the code below to get the serial number.', 
    footer: global.footer 
  })
/*  } else
    m.reply(`You have unregistered, wait another ${waktutionskh} to be able to unregister again.`) */
}
handler.help = ['ceksn']
handler.tags = ['user']
handler.command = ['ceksn']
handler.register = handler.limit = true

module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ ms, h, m, s })
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':')
}