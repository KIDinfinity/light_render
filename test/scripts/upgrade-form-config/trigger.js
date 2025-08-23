const { remvoeEmptyConditionConfig } = require('./remove-empty-config')
const path = require('path');

(() => {
  const dictPath = path.resolve(__dirname, '../../packages/Process/NB');
  remvoeEmptyConditionConfig({ dictPath })
})()
