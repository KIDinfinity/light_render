import lodash from 'lodash';
import { getContractTypeAndNoRepeat } from '@/services/owbNbCfgControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* ({ payload }: any, { call, put, select }: any): any {
  const contractType = lodash.get(payload, 'contractType');
  const response = yield call(
    getContractTypeAndNoRepeat,
    objectToFormData({
      contractType,
    })
  );
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && lodash.isArray(resultData)) {
    yield put({
      type: 'setContractType',
      payload: {
        contractType: resultData,
      },
    });
  }
}
