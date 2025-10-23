import lodash from 'lodash';
import { listPlanWaiverComponent } from '@/services/owbNbCfgControllerService';

export default function* (params: any, { call, put }: any) {
  if (
    lodash.isEmpty(params.payload.coreCodes) ||
    lodash.every(params.payload.coreCodes, (item) => item === null || item === undefined)
  )
    return false;
  const response = yield call(listPlanWaiverComponent, params.payload.coreCodes);
  if (response?.success) {
    yield put({
      type: 'saveWaiverListByProductCode',
      payload: {
        waiverList: lodash.get(response, 'resultData'),
      },
    });
    return true;
  }

  return false;
}
