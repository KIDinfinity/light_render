import lodash from 'lodash';
import { getProductInfoByContractType } from '@/services/owbNbCfgControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* ({ payload }: any, { call, put, select }: any) {
  const contractType = lodash.get(payload, 'contractType');
  const businessNo: any = lodash.get(payload, 'businessNo');

  if (!contractType || !businessNo) {
    return;
  }

  const response = yield call(
    getProductInfoByContractType,
    objectToFormData({
      contractType,
      applicationNo: businessNo,
    })
  );
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'savePlanProdctionConfig',
      payload: {
        planProductConfig: resultData,
      },
    });
  }
}
