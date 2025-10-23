import lodash from 'lodash';
import { getSpecificCfgFactoringHouses } from '@/services/owbNbCfgControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(getSpecificCfgFactoringHouses);
  if (response?.success && response?.resultData) {
    yield put({
      type: 'setSpecificCfgFactoringHouses',
      payload: {
        specificCfgFactoringHouses: lodash.get(response, 'resultData', []),
      },
    });
  }
}
