import claimSplitClaimCaseService from '@/services/claimSplitClaimCaseService';
import { Action } from '@/components/AuditLog/Enum';

// /api/claim/assessment/th/rb/split
export default function* ({ payload }: any, { call, put }: any) {
  const { postData } = payload;

  const response = yield call(claimSplitClaimCaseService.splitCaseV2, postData);

  /** -- auditLog -- */
  if (response?.success) {
    yield put({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.Split,
      },
    });
    yield put({
      type: 'navigatorInformationController/loadAllCategoryInformation',
    });
  }

  return response;
}
