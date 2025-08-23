const { replace } = require('./index')
const path = require('path');

(() => {
  replace({
    //  dictPath: path.resolve(__dirname, '../../packages/Process/NB/ManualUnderwriting')
    dictPath: path.resolve(__dirname, '../../packages/Process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Header/components/Actions/components/AddLoading/AddLoadingModal/AddLoadingForm/LoadingItems/Section/Fields')
    // packages/Process/NB/ManualUnderwriting/PolicyInfo
    // dictPath: path.resolve(__dirname, '../../packages/Process/NB/ManualUnderwriting/PolicyReplacement/PolicyReplacement-Table/Section/Fields')
    // dictPath: path.resolve(__dirname, '../../packages/Process/NB/ManualUnderwriting/PolicyInfo/ExcenNtu/Section')
  })
})()
