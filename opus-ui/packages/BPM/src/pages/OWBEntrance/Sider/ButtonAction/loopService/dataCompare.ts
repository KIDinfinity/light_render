import lodash from 'lodash';

export default ({ data, cacheData }: any) => {
  const snapshotDataListWhiteList = ['version'];

  const newObjValue = lodash.cloneDeep(data);
  const newCacheData = lodash.cloneDeep(cacheData);

  for (let i = 0; i < data?.snapshotDataList?.length; i++) {
    snapshotDataListWhiteList?.forEach((item) => {
      delete newObjValue?.snapshotDataList?.[i]?.[item];
      delete newCacheData?.snapshotDataList?.[i]?.[item];
    });
  }
  return lodash.isEqual(newObjValue, newCacheData);
};
