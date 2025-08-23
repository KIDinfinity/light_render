const path = require('path');
const { colorBizVarCollect } = require('../colorBizVarCollect');

(() => {
  const packages = path.resolve(__dirname, '../../../../packages')
  const dictPath = path.resolve(__dirname, '../../../../packages/Navigator/src/pages/Home/Watching/View/Card/Item')
  // const dictPath = path.resolve(__dirname, '../../../../packages/Configuration/src/pages/ConfigurationProcess/ConfigureUserGroup/DataConfiguration/FormData/Section')
  // const dictPath = path.resolve(__dirname, '../../../../packages/BPM/src/pages/Information/complex/AddInformation');
  // const dictPath = path.resolve(__dirname, '../../../../packages/Basic/src/components/CommonModal');
  const collectionFile = path.resolve(__dirname, '../colorBizVarCollection.json')
  colorBizVarCollect({
    dictPath,
    collectionFile,
  });
})()
