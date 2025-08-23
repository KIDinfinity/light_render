import lodash from 'lodash';

export default function* updateCheckduplicateData({ payload }: any, { put, select }: any) {
  const checkDuplicateBusinessData = lodash.get(payload, 'businessData');
  const businessData = yield select((state) => state?.manualUnderwriting?.businessData);

  const checkDuplicating = yield select((state) => state?.manualUnderwriting?.checkDuplicating);

  if (checkDuplicating) {
    const preClientIndex = lodash.findIndex(businessData?.policyList?.[0]?.clientInfoList, {
      id: checkDuplicating,
    });
    const nextClient = lodash.find(checkDuplicateBusinessData?.policyList?.[0]?.clientInfoList, {
      id: checkDuplicating,
    });

    if (preClientIndex === -1 || lodash.isEmpty(nextClient)) {
      return;
    }
    const result = lodash.cloneDeep(businessData);
    lodash.set(result, `policyList[0].clientInfoList[${preClientIndex}]`, nextClient);
    yield put({
      type: 'saveCheckduplicateData',
      payload: {
        checkduplicateData: result,
      },
    });
  }
}
