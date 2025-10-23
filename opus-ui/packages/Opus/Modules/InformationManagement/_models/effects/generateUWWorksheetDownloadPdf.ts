import {
  downloadUWAssessmentWorksheet,
  downloadAssessmentWorksheet,
} from '@/services/uwWorksheetControllerService';
import NAMESPACE from '../namespace';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { Action } from '@/components/AuditLog/Enum';

const ApiMap = {
  [BusinessCode.claim]: downloadAssessmentWorksheet,
  [BusinessCode.nb]: downloadUWAssessmentWorksheet,
};

export default function* ({ payload }: any, { call, put, select }: any): Generator<any, any, any> {
  const businessCode = payload?.businessCode;
  const generateUWWorksheetModal = yield select(
    (state) => state?.[NAMESPACE]?.generateUWWorksheetModal
  ) as any;

  const api = ApiMap[businessCode];
  if (api) {
    const response = yield call(api, {
      caseNo: generateUWWorksheetModal?.caseNo,
      fileName: generateUWWorksheetModal?.fileName,
    });
    if (response && response instanceof Blob) {
      yield put({
        type: 'auditLogController/logTask',
        payload: {
          action: Action.Download,
        },
      });
    } else {
      console.log('fail');
    }
  }
}
