import lodash from 'lodash';
import owbNbCfgControllerService from '@/services/owbNbCfgControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const response = yield call(owbNbCfgControllerService.getRegionalDefaultValues);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'setRegionalDefaultValueList',
      payload: {
        cfgRegionalDefaultValueList: resultData,
      },
    });
  }
}
