import lodash from 'lodash';
import {
  publishServiceDownNotice,
  sendKickOutNotice,
  stopService,
  resumeService,
} from '@/services/loginLogoutControllerService';
import { notification } from 'antd';
import handleMessageModal from '@/utils/commonMessage';
import { OptionNode } from '../../Enum';

export default function* setNotice({ payload }: any, { call, put, select }: any) {
  const { title } = payload;
  const { submitDownTime, advancedWarningSeconds } = yield select(
    (state: any) => state.serviceSystemController?.downInfo
  );

  const requestConfig: any = {
    url: '',
    params: {},
    message: '',
  };
  switch (title) {
    case OptionNode.SendNoticeToOnlineUse:
      requestConfig.url = publishServiceDownNotice;
      requestConfig.message = 'publishServiceDownNotice';
      requestConfig.params = {
        downTime: submitDownTime,
        advancedWarningSeconds: advancedWarningSeconds * 60,
      };
      break;
    case OptionNode.ForceKickOut:
      requestConfig.url = sendKickOutNotice;
      requestConfig.message = 'sendKickOutNotice';
      break;
    case OptionNode.StopCreateCaseService:
      requestConfig.url = stopService;
      requestConfig.message = 'stopService';

      break;
    case OptionNode.ResumeService:
      requestConfig.url = resumeService;
      requestConfig.message = 'resumeService';

      break;

    default:
      break;
  }
  if (lodash.isEmpty(requestConfig?.url)) {
    // @ts-ignore
    const response: any = yield call(requestConfig.url, { ...requestConfig?.params });
    if (lodash.isPlainObject(response) && response?.success) {
      notification.success({
        message: `${requestConfig?.message} successfully!`,
      });
      yield put({
        type: 'getSystemStatus',
      });
      if (title === OptionNode.StopCreateCaseService) {
        yield put({
          type: 'saveDownInfo',
          payload: {
            downTime: 0,
            advancedWarningSeconds: 0,
          },
        });
      }
    } else {
      handleMessageModal(response?.promptMessages);
    }
  }
}
