import lodash from 'lodash';
import { getContractTypeAndNoRepeat } from '@/services/owbNbCfgControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* ({ payload }: any, { call, put }: any): any {
  const contractType = lodash.get(payload, 'contractType');
  const response = yield call(
    getContractTypeAndNoRepeat,
    objectToFormData({
      contractType,
    })
  );
  if (lodash.isPlainObject(response) && response?.success && lodash.isArray(response.resultData)) {
    yield put({
      type: 'saveContractTypeList',
      payload: {
        contractTypeList: lodash
          .chain(response.resultData)
          .map((el) => ({ dictCode: el, dictName: el }))
          .value(),
      },
    });
  }
}
