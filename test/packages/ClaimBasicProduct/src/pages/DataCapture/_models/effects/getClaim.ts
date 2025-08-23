import { serialize as objectToFormData } from 'object-to-formdata';
import claimCaseControllerService from '@/services/claimCaseControllerService';

export default function* getClaim({ payload }: any, { call, put, select }: any) {
  const requestParam = objectToFormData(payload);

  const response = yield call(claimCaseControllerService.get, requestParam);
  if (response.success && response.resultData) {
    const claimProcessData = response.resultData;
    // 保存理赔数据
    yield put({
      type: 'saveClaimProcessData',
      payload: claimProcessData,
    });
    yield put({
      type: 'saveDefaultClaimProcessData',
    });
  }
  return response;
}
