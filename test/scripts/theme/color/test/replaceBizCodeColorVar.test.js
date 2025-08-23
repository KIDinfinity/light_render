const path = require('path');
const fs = require('fs');
const { replaceBizCodeColorVar } = require('../replaceBizCodeColorVar');

(() => {
  const dictPath = path.resolve(__dirname, '../../../../packages');
  const src = path.resolve(__dirname, '../../../../src');
  const logFile = path.resolve(__dirname, '../colorChangeLog.json')
  const content = fs.readFileSync(logFile, 'utf8');
  console.log('content', content);
  const json = JSON.parse(content);
  const changeLog = json.logs;
  replaceBizCodeColorVar({
    dictPath,
    changeLog
  })
  replaceBizCodeColorVar({
    dictPath: src,
    changeLog
  })
})()
