import lodash from 'lodash';
import envoyReasonInfoControllerService from '@/services/envoyReasonInfoControllerService';

interface IAction {
  cron: number;
  enableWorkday: boolean;
  startTime: string;
  ctn: any;
}
function* setScheduleSendTime({ payload }: IAction, { call, put }) {
  const { cron, enableWorkday, startTime, ctn } = payload;
  lodash.set(ctn, 'cron', cron);
  if (startTime) {
    const res = yield call(envoyReasonInfoControllerService.getReminderSendTime, {
      cron,
      enableWorkday,
      startTime,
    });
    if (lodash.isPlainObject(res) && res.success && lodash.isString(res.resultData)) {
      lodash.set(ctn, 'scheduleSendTime', res?.resultData);
    }
  }
  yield put({
    type: 'envoyController/saveTplDetail',
    payload: {
      type: 'reminder',
      tplCtn: ctn,
    },
  });
}

export default setScheduleSendTime;
