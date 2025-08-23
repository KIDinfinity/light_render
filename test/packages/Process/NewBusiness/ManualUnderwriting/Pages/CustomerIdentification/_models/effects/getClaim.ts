import lodash from 'lodash';

export default function* getClaim({ payload }: any, { put }: any) {
  const { activityCode, caseCategory, businessNo, businessData } = payload;
  yield put({
    type: 'getPageAtomConfig',
    payload: { activityCode, caseCategory },
  });
  if (!lodash.isEmpty(businessData)) {
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        claimProcessData: { ...businessData },
      },
    });
    return;
  }
  // 根据businessNo，重新获取数据
  yield put({
    type: 'getCustomerIdentificationData',
    payload: { businessNo },
  });
}
