module.exports = {
  run: async (m, { conn, Func }) => {
    let _uptime = process.uptime() * 1000
    let uptime = Func.toTime(_uptime)
    conn.reply(m.chat, Func.texted('bold', `Running for : [ ${uptime} ]`), m)
  },
  help: ['runtime'],
  tags: ['miscs'],
  command: /^(runtime|run)$/i
}