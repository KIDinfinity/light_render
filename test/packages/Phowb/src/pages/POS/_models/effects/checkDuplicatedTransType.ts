import lodash from 'lodash';
import { checkDuplicatedTransType } from '@/services/posControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const { posNo, transactionType } = payload;
  const response = yield call(checkDuplicatedTransType, {
    posNo,
    transactionType,
  });
  if (lodash.isPlainObject(response) && response.success && lodash.isBoolean(response.resultData)) {
    yield put({
      type: 'saveDuplicate',
      payload: {
        duplicate: response.resultData,
      },
    });
    return response.resultData;
  }
  return false;
}
