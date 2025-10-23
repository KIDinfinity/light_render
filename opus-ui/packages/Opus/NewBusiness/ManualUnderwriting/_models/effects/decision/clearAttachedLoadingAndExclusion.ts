export default function* (action, { call, put, select }: any) {
  if(!action?.payload?.coverageItem)
    return;
  const coverageItem = action.payload.coverageItem;
  const clearedLoadingIdList = (coverageItem.coverageLoadingList || []).filter(item => item && item.loadingFunctionType !== 'C').map(item => item.id);
  const clearedExclusionIdList = (coverageItem.coverageExclusionList || []).map(item => item.id);

  if(clearedLoadingIdList.length || clearedExclusionIdList.length) {
    yield put({
      type: 'clearLoadingOrExclusion',
      payload: {
        clearedLoadingIdList,
        clearedExclusionIdList,
        coverageItemId: coverageItem.id,
      }
    });
    yield put({
      type: 'supplyUwDecisionEditInd'
    })
  }
}
