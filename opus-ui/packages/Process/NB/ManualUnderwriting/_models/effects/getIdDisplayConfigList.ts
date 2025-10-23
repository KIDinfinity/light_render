import lodash from 'lodash';
import { getIdDisplayConfigList } from '@/services/miscCfgInquiryControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(getIdDisplayConfigList);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    yield put({
      type: 'setIdDisplayConfigList',
      payload: {
        idDisplayConfigList: resultData,
      },
    });
  }
}
