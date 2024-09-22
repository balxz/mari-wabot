let handler = async(m, {conn, command, usedPrefix, text}) => {
  global.db.data.users[m.sender].catatan = global.db.data.users[m.sender].catatan || []

  let i = 0
  if (global.db.data.users[m.sender].catatan.length == 0) return m.reply('Kamu belum punya catatan!')
  let txt = 'Daftar catatan :\n\n'
  for (let ct in global.db.data.users[m.sender].catatan) {
    i += 1
    txt += '[' + i + ']. ' + global.db.data.users[m.sender].catatan[ct].title + '\n'
  }
  
  txt += `\nPenggunaan: ${usedPrefix}hapuscatatan 1`
  if (text.length == 0) return m.reply(txt)
  let catatan = global.db.data.users[m.sender].catatan
  let split = text.split('|')
  if (catatan.length == 0) return m.reply('Kamu belum memiliki catatan!')
  let n = Number(split[0]) - 1
  if (catatan[n] == undefined) return m.reply('Catatan tidak ditemukan!')
  let tmp = []

  for (let ct in catatan) {
    if(ct != n) {
      tmp.push(catatan[ct])
    } else {
      continue
    }
  }

  cdang = global.db.data.users[m.sender].catatan
  global.db.data.users[m.sender].catatan = tmp
  m.reply('Berhasil menghapus catatan!')
}
handler.help = ['hapuscatatan'].map(v => v + ' *judul*');
handler.tags = ['database']
handler.command = /^hapuscatatan$/i

module.exports = handler