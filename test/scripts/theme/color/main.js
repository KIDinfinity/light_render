const path = require('path');
const fs = require('fs');
const { standardColorValue } = require('./standardColorValue');
const { replaceBizCodeColorVar } = require('./replaceBizCodeColorVar');

(() => {
  const packages = path.resolve(__dirname, '../../../packages');
  const src = path.resolve(__dirname, '../../../src');
  const colorVarFile = path.resolve(__dirname, '../../../src/themes/variables/colors.less');
  const logFile = path.resolve(__dirname, './colorChangeLog.json')
  console.log('packages', packages);
  console.log('src', src);
  console.log('colorVarFile', colorVarFile)
  standardColorValue(packages)
  standardColorValue(src);
  const content = fs.readFileSync(logFile, 'utf8');
  console.log('content', content);
  try {
    const json = JSON.parse(content);
    const changeLog = json.logs;
    replaceBizCodeColorVar({
      dictPath: packages,
      changeLog,
    })
    replaceBizCodeColorVar({
      dictPath: src,
      changeLog,
    })
  } catch(e) {
    console.error(e)
  }
})()
