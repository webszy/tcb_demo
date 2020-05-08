const app = require('./tcb')
const db = app.database()
const logDB = db.collection('logs')
module.exports = logDB
