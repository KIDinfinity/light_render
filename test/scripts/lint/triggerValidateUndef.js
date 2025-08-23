const path = require('path');
const { validateUnDef } = require('./eslint/noUndefValidate');

(() => {
  const dictPath = path.resolve(__dirname, '../../packages');
  const srcPath = path.resolve(__dirname, '../../src')
  const createCasePath = path.resolve(__dirname, '../../packages/Phowb/src/pages/BatchCreateProcess')
  validateUnDef({ dictPaths: [dictPath, srcPath] });
  // validateUnDef({ dictPaths: [createCasePath] });
})()
