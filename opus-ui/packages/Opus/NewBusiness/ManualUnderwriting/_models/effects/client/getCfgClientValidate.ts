import lodash from 'lodash';
import { getCfgClientValidate } from '@/services/owbNbCfgControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* (_: any, { call, put }: any): Generator<any, void, any> {
  const response = yield call(getCfgClientValidate, objectToFormData({ infoType: 'A' }));
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'saveAddrTypeDicts',
      payload: {
        addrTypeDicts: resultData,
      },
    });
  }
}
