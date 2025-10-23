import claimAmlNameScreenControllerService from '@/services/claimAmlNameScreenControllerService';
import { Action } from '@/components/AuditLog/Enum';
import { handleMessageModal } from '@/utils/commonMessage';
import lodash from 'lodash';

export default function* refreshNameScreening({ payload, setOpen }: any, { call, put }: any) {
  const response = yield call(claimAmlNameScreenControllerService.refreshNameScreen, payload);

  if (response && response?.success && response?.resultData) {
    if (response.promptMessages?.length) {
      const type = lodash.get(response, 'promptMessages[0].type');

      handleMessageModal(response?.promptMessages, {
        type: lodash.toLower(type),
        hiddenExtraText: true,
      });
    }

    yield put({
      type: 'saveNameScreening',
      payload: response?.resultData,
    });
    yield put({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.NameScreening,
      },
    });
    // setOpen(false);
  }
}
