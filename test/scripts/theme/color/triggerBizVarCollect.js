const path = require('path');
const { colorBizVarCollect } = require('./colorBizVarCollect');

(async () => {
  const packages = path.resolve(__dirname, '../../../packages');
  const src = path.resolve(__dirname, '../../../src')
  const collectionFile = path.resolve(__dirname, './colorBizVarCollection.json')
  const configuration = path.resolve(__dirname, '../../../packages/Configuration/src/pages/ConfigurationCenter/Styles');
  const addInformation = path.resolve(__dirname, '../../../packages/BPM/src/pages/Information/complex/AddInformation')
  const reminder = path.resolve(__dirname, '../../../packages/BPM/src/pages/Envoy/EnvoyList/Reminder');
  const SelectGroup = path.resolve(__dirname, '../../../packages/BPM/src/components/SelectGroup');
  const PolicyList = path.resolve(__dirname, '../../../packages/Claim/src/pages/360/pages/PosHistory/PolicyList')
  const currentReasonGroup = path.resolve(__dirname, '../../../packages/BPM/src/pages/Envoy/EnvoyList/CurrentReasonGroup');
  const freeFilelds = path.resolve(__dirname, '../../../packages/BPM/src/pages/Envoy/modules/FreeFields');

  const Envoy = path.resolve(__dirname, '../../../packages/BPM/src/pages/Envoy')
  await colorBizVarCollect({
    dictPath: Envoy,
    collectionFile
  })
  // await colorBizVarCollect({
  //   dictPath: SelectGroup,
  //   collectionFile
  // })
  // await colorBizVarCollect({
  //   dictPath: freeFilelds,
  //   collectionFile
  // })
  // await colorBizVarCollect({
  //   dictPath: packages,
  //   collectionFile
  // })
  // await colorBizVarCollect({
  //   dictPath: src,
  //   collectionFile
  // })
})()
