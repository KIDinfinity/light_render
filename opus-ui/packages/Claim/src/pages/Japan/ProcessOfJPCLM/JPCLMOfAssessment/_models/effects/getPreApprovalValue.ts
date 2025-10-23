import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getPreApprovalValue } from '@/services/bpmBusinessProcessService';

interface IPayload {
  payload: {
    inquiryBusinessNo: string;
  };
}

interface IEffects {
  call: any;
  put: any;
}

export default function* ({ payload }: IPayload, { call, put }: IEffects) {
  const { inquiryBusinessNo } = payload;
  const response = yield call(getPreApprovalValue, objectToFormData({ inquiryBusinessNo }));
  if (lodash.get(response, 'success')) {
    const resultData: string = lodash.get(response, 'resultData');
    yield put({
      type: 'savePreApprovalValue',
      payload: {
        preApprovalValue: resultData,
      },
    });
    return resultData;
  }
  return '';
}
