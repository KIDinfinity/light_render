import { editCancel } from '@/services/owbNbChequeInfoControllerService';
import lodash from 'lodash';

export default function* (_: any, { call, put }: any) {
  const params = yield put.resolve({
    type: 'getChequeParams',
  });

  const response = yield call(editCancel, params);

  if (lodash.isPlainObject(response) && !!response.success) {
    return true;
  }
}
