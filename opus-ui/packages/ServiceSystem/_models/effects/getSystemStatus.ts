import lodash from 'lodash';
import loginLogoutControllerService from '@/services/loginLogoutControllerService';

export default function* getSystemStatus({ payload }: any, { call, put, select }: any) {
  const response = yield loginLogoutControllerService.getSystemStatus();

  if (lodash.isPlainObject(response) && response.success && lodash.isString(response.resultData)) {
    yield put({
      type: 'saveSystemStatus',
      payload: {
        systemStatus: response.resultData,
      },
    });
  }
}
