const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, './colorChangeLog.json')

const resetColorChangeLog = () => {
  fs.writeFileSync(logFile, JSON.stringify({
    logs: []
  }))
}

module.exports = { resetColorChangeLog }
