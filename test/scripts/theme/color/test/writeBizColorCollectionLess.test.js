const path = require('path');
const { writeBizColorCollectionLess } = require('../writeBizColorCollectionLess');

(() => {
  const targetPathDark = path.resolve(__dirname, '../../../../src/themes/configs/collect.dark.less');
  const targetPathLight = path.resolve(__dirname, '../../../../src/themes/configs/collect.light.less');
  const sourcePath = path.join(__dirname, '../colorBizVarCollection.json')
  writeBizColorCollectionLess({
    targetPath: targetPathDark,
    sourcePath,
    theme: 'dark'
  })
  writeBizColorCollectionLess({
    targetPath: targetPathLight,
    sourcePath,
    theme: 'light'
  })
})()
