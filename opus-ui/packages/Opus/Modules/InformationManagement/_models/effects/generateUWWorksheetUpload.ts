import { notification } from 'antd';
import { BusinessCode } from 'claim/enum/BusinessCode';
import {
  uploadUWAssessmentWorksheet,
  uploadAssessmentWorksheet,
} from '@/services/uwWorksheetControllerService';

import NAMESPACE from '../namespace';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Action } from '@/components/AuditLog/Enum';

const apiMap = {
  [BusinessCode.claim]: uploadAssessmentWorksheet,
  [BusinessCode.nb]: uploadUWAssessmentWorksheet,
};

export default function* ({ payload }: any, { call, put, select }: any): Generator<any, any, any> {
  const { businessCode } = payload || {};
  const generateUWWorksheetModal = yield select(
    (state) => state?.[NAMESPACE]?.generateUWWorksheetModal
  ) as any;

  const api = apiMap[businessCode];
  if (!api) return;

  const response = yield call(api, {
    caseNo: generateUWWorksheetModal?.caseNo,
    fileName: generateUWWorksheetModal?.fileName,
  });

  if (response?.success) {
    notification.success({
      message: formatMessageApi({
        Label_COM_Message: 'MSG_001099',
      }),
    });
    yield put({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.Upload,
      },
    });
  }
}
