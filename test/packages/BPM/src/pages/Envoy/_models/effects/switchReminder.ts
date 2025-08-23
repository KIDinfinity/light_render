import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import envoyReasonInfoControllerService from '@/services/envoyReasonInfoControllerService';
import { Action } from '@/components/AuditLog/Enum';

interface IAction {
  reason: any;
}

function* switchReminder({ payload }: IAction, { call, put, select }) {
  const { reason } = payload;
  const { id, enableReminder } = lodash.pick(reason, ['id', 'enableReminder']);
  const res = yield call(
    envoyReasonInfoControllerService.switchReminder,
    objectToFormData({
      reasonDetailId: id,
      enableReminder: !enableReminder,
    })
  );
  if (lodash.isPlainObject(res) && res.success) {
    yield put({
      type: 'saveTplDetail',
      payload: {
        type: 'reason',
        tplCtn: { ...reason, enableReminder: !enableReminder },
      },
    });
    yield put({
      type: 'validateFields',
      payload: {
        dataId: reason?.groupId,
      },
    });

    const { activityKey, caseNo } = yield select((state: any) => ({
      ...lodash.pick(state?.envoyController, ['activityKey', 'caseNo']),
    }));
    /*  --auditLog--  */
    const { reasonName } = lodash.pick(reason, ['reasonName']);
    yield put({
      type: 'auditLogController/logEnvoy',
      payload: {
        action: enableReminder ? Action.TurnOffReminder : Action.TurnOnReminder,
        caseNo,
        currentActivityKey: activityKey,
        desc: reasonName,
      },
    });
  }
}

export default switchReminder;
