import lodash from 'lodash';
import navigatorEnvoyControllerService from '@/services/navigatorEnvoyControllerService';
import handleMessageModal from '@/utils/commonMessage';
import { Action } from '@/components/AuditLog/Enum';
import { transferToJson, argToVal } from 'bpm/pages/Envoy/_utils/dataTransferFn';

interface IAction {
  reminder: any;
}

function* sendReminder({ payload }: IAction, { call, put, select }) {
  const { reminder, reasonName } = payload;

  const currentReasonGroups = yield select((state: any) => state.envoyController.currentReasonGroups);
  const hasError = yield put.resolve({
    type: 'validateFields',
    payload: {
      type: 'reminder',
      sendDataId: reminder?.id,
      dataId: reminder?.groupId,
    },
  });
  if (hasError) {
    return;
  }
  const newReminder = transferToJson(lodash.cloneDeep(reminder));
  // eslint-disable-next-line no-param-reassign
  newReminder.channelDataList = argToVal(newReminder.channelDataList);
  const res = yield call(navigatorEnvoyControllerService.sendReminder, newReminder);
  if (lodash.isPlainObject(res) && res.success) {
    yield put.resolve({
      type: 'updateEnvoyData',
      payload: {
        oldData: lodash.chain(currentReasonGroups).find({
          id: reminder?.groupId
        }).value(),
        newData: res.resultData,
      }
    })
    yield put({
      type: 'delSendDataId',
      payload: {
        sendDataId: newReminder?.id,
      },
    });
    const { activityKey, caseNo } = yield select((state: any) => ({
      ...lodash.pick(state?.envoyController, ['activityKey', 'caseNo']),
    }));

    /*  --auditLog--  */
    yield put({
      type: 'auditLogController/logEnvoy',
      payload: {
        action: Action.SendReminder,
        caseNo,
        currentActivityKey: activityKey,
        desc: reasonName,
      },
    });
  } else {
    const promptMessages = lodash.get(res, 'promptMessages', []);
    handleMessageModal(promptMessages);
  }
}

export default sendReminder;
