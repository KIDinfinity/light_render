import lodash from 'lodash';
import moment from 'moment';
import loginLogoutControllerService from '@/services/loginLogoutControllerService';

export default function* getServiceDownInfo(_: any, { put }: any) {
  const response = yield loginLogoutControllerService.getServiceDownInfo();
  if (
    lodash.isPlainObject(response) &&
    response?.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    const { downTime, advancedWarningSeconds } = response.resultData;
    if (downTime && advancedWarningSeconds) {
      const setTime = moment(downTime).diff(moment(new Date()).add(advancedWarningSeconds, 's'));
      yield put({
        type: 'saveDownInfo',
        payload: {
          downTime,
          advancedWarningSeconds,
          setTime,
        },
      });
      yield put({
        type: 'saveMessageType',
        payload: {
          messageType: 501,
        },
      });
    }
  }
}
