import { tenant } from '@/components/Tenant';
import { NAMESPACE } from '../../activity.config';
import { updateCase } from '@/services/navigatorHnwCustomerRefreshControllerService';

export default function* policyInfoRemoteAsyncEnd({ payload }: any, { call, put, select }: any) {
  const loopTime = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.loopTime);
  const taskDetail = yield select(({ processTask }: any) => processTask?.getTask);
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

  if (tenant.isHK()) {
    yield call(updateCase, {
      policyOwnerList: data?.policyOwnerList,
      policyInsuredList: data?.policyInsuredList,
      caseNo: taskDetail?.caseNo,
    });
  }
}
