const fs = require('fs');
const moment = require('moment')

function readLOG() {
  const log = fs.readFileSync('data/log.txt');
  console.log(log);
}

function writeLOG(message) {
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
  }
  const stream = fs.createWriteStream('data/log.txt', { flags: 'a' });
  stream.once('open', () => {
    stream.write(`> [${moment().format('DD/MM HH:mm:ss').toString()}] ${message}\r\n`);
  });
}

module.exports = {
  write: (message) => writeLOG(message),
  read: () => readLOG(),
};
