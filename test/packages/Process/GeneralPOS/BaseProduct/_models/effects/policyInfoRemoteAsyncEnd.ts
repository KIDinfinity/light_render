import { NAMESPACE } from '../../activity.config';

export default function* policyInfoRemoteAsyncEnd({ payload }: any, { put, select }: any) {
  const { caseCategory, activityKey } = yield select(({ processTask }: any) => processTask.getTask);
  const loopTime = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.loopTime);

  const { policyNo, data } = payload;

  if (!loopTime) {
    return false;
  }

  yield put({
    type: 'policyInfoUpdate',
    payload: {
      policyInfo: {
        ...data,
        clientInfoList: (data?.clientInfoList || []).map((item) => ({
          ...item,
          dob: item?.dateOfBirth || item?.dob,
        })),
        policyInfoList: data?.applyToPolicyInfoList || [],
        clientBankAccountList: (data?.clientBankAccountList || []).map((item) => ({
          ...item,
          bankCurrency: item?.currencyCode,
        })),
      },
      policyId: policyNo,
    },
  });

  if (!payload?.isPaymentTrackResult) {
    yield put({
      type: 'policyInfoRemoteEffect',
      payload: {
        caseCategory,
        activityKey,
      },
    });
  }

  yield put({
    type: 'insured360/saveTaskInfo',
    payload: {
      taskDetail: {
        businessNo: '',
        insuredId: data?.mainOwnerClientId,
        clientId: data?.mainOwnerClientId,
        caseCategory,
      },
    },
  });
}
