import { businessDataBEToFE } from '@/services/gotConvertService';

import { NAMESPACE as NBNAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* ({ payload }: any, { put, call }: any): Generator<any, void, any> {
  const checkDuplicating = payload?.checkDuplicating;
  const response = yield call(businessDataBEToFE, { requestData: { ...payload?.businessData } });

  if (response.success) {

    yield put({
      type: `${NBNAMESPACE}/saveIdentification`,
      payload: {
        businessDataForFe: response?.responseData,
        businessDataForBe: payload?.businessData,
        updateModalType: checkDuplicating ? 'client' : '',
      },
    });
    if (checkDuplicating) {
      yield put({
        type: `setCheckDuplicating`,
        payload: {
          checkDuplicating: '',
        },
      });
    }
  }
}
