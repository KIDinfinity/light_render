import lodash from 'lodash';
const shouldDelKeyList = ['planInfoData.bankInfoList.icpDividendPayType__added'];
export default (diffMap) => {
  const finalMap = lodash.cloneDeep(diffMap);
  // 针对planInfoData.bankInfoList[0[1]].icpDividendPayType__added进行的处理
  for (const [path, _] of Object.entries(diffMap)) {
    const tempPath = path?.replace(/\[.*?\]/g, '')?.replace(/\]/g, '');
    if (tempPath && shouldDelKeyList?.includes(tempPath)) {
      delete finalMap[path];
    }
  }
  return finalMap;
};
