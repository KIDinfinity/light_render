const path = require('path');
const { standardColorValue }  = require('../standardColorValue');
(() => {
  const rootDir = path.resolve(__dirname, '../../../../packages')
  standardColorValue(rootDir)
})()
