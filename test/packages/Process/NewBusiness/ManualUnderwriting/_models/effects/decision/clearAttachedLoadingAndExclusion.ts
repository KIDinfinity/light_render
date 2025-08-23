export default function* (action, { call, put, select }: any) {
  if(!action?.payload?.coverageItem)
    return;
  const coverageItem = action.payload.coverageItem;
  const clearedLoadingIdList = (coverageItem.coverageLoadingList || []).filter(item => item && item.loadingFunctionType !== 'C').map(item => item.id);
  const clearedExclusionIdList = (coverageItem.coverageExclusionList || []).map(item => item.id);
  const coverageRemarkList = coverageItem.coverageRemarkList || [];
  if(coverageRemarkList.length) {
    yield put({
      type: 'deleteDPRemarkItem',
      payload: {
        coverageItemId: coverageItem.id,
        deleteAll: true
      }
    })
  }

  if(clearedLoadingIdList.length || clearedExclusionIdList.length) {
    yield put({
      type: 'clearLoadingOrExclusion',
      payload: {
        clearedLoadingIdList,
        clearedExclusionIdList,
      }
    });
    yield put({
      type: 'supplyUwDecisionEditInd'
    })
  }
}
