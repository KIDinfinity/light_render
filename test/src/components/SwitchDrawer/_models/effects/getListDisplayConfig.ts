import lodash from 'lodash';
import { listDisplayConfig } from '@/services/bpmSideBarDisplayConfigService';

export default function* (action: any, { call, put }: any) {
  const response = yield call(listDisplayConfig);

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    yield put({
      type: 'saveListDisplayConfig',
      payload: {
        listDisplayConfig: response.resultData,
      },
    });
  }
}
