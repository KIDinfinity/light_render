import { getPhLaLivingClaimPayableRegisterStatus } from '@/services/claimRegisterControllerService';

export default function* checkPayableRegisted({ payload }: any, { call, put }: any) {
  const dataForSubmit = yield put.resolve({
    type: 'getDataForSubmit',
  });
  const response = yield call(getPhLaLivingClaimPayableRegisterStatus, {
    ...dataForSubmit,
  });
  if (response?.success && response?.resultData) {
    yield put({
      type: 'saveClaimProcessData',
      payload: response.resultData,
    });
  }
}
