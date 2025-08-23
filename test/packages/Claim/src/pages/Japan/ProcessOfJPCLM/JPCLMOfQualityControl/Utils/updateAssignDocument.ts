import lodash from 'lodash';

const mixArrayFunc = (arrVal: any, othVal: any, key: string) =>
  lodash.chain(othVal).concat(arrVal).uniqBy(key).value();

export default (claimData: any, response: any) => {
  const { resultData } = response;
  const claimApplicationDocList = lodash.get(claimData, 'claimApplicationDocList') || [];
  const bpoFormDataList =
    lodash.get(claimData, 'bpoBatchDataVO.bpoDocumentDataList[0].bpoFormDataList') || [];
  const newBpoFormDataList = lodash.get(resultData, 'bpoFormDataList') || [];
  const newClaimApplicationDocList = lodash.get(resultData, 'applicationDocList') || [];
  const mixClaimApplicationDocList = mixArrayFunc(
    claimApplicationDocList,
    newClaimApplicationDocList,
    'applicationNo'
  );
  const mixBpoFormDataList = mixArrayFunc(bpoFormDataList, newBpoFormDataList, 'documentId');

  return {
    claimApplicationDocList: mixClaimApplicationDocList,
    bpoFormDataList: mixBpoFormDataList,
  };
};
