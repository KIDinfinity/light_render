import { getSlaPercentage } from '@/services/dcDashboardControllerService';
import lodash from 'lodash';

export default function* (_: any, { select, call, put }: any): Generator<any, any, any> {
  const response = yield call(getSlaPercentage);

  if (lodash.isPlainObject(response) && !!response?.success) {
    yield put({
      type: 'saveSlaPercentage',
      payload: {
        slaPercentage: response.resultData || 0,
      },
    });
  }

  return response;
}
