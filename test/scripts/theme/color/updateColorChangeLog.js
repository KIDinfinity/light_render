const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const logFile = path.join(__dirname, './colorChangeLog.json')

const updateColorChangeLog = (change) => {
  console.log(change, 'change');
  if (change.from === change.to) {
    return false;
  }
  const result = fs.readFileSync(logFile, 'utf-8')
  const json = JSON.parse(result);
  const logs = new Set(json.logs);
  logs.add(change);
  fs.writeFileSync(logFile, JSON.stringify({
    logs: lodash.unionWith([...logs], lodash.isEqual)
  }))
}

module.exports = { updateColorChangeLog }
