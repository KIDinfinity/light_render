import lodash from 'lodash';
import claimJpclmClaimControllerService from '@/services/claimJpclmClaimControllerService';
import { CategoryCode } from '@/utils/constant/information';
import { Action } from '@/components/AuditLog/Enum';
import bpm from 'bpm/pages/OWBEntrance';

export default function* reAssessment({ payload }: any, { call, put, select }: any) {
  const { processInstanceId, taskId } = yield select((state: any) => state.processTask.getTask);
  const { submit, byAssignDocument } = payload;
  const requestUrl = byAssignDocument
    ? claimJpclmClaimControllerService.reassessByAssignDocument
    : claimJpclmClaimControllerService.reAssessment;

  /** -- auditLog -- */
  yield put({
    type: 'auditLogController/logButton',
    payload: {
      action: Action.Save,
      claimProcessData: submit,
    },
  });

  const response = yield call(requestUrl, submit);

  if (response && response.success && response.resultData) {
    yield put({
      type: 'saveClaimProcessData',
      payload: response.resultData,
    });
    yield put({
      type: 'claimCaseController/saveSnapshot',
      payload: {
        postData: response.resultData,
      },
    });
    const claimNo = lodash.get(response, 'resultData.claimNo');
    yield put({
      type: 'queryListPolicy',
      payload: { claimNo },
    });
    yield put({
      type: 'getPolicyInsuredBeneficiaryOwner',
      payload: { claimNo },
    });

    // 提示一次差定注意点
    if (response.resultData.notificationList && response.resultData.notificationList.length > 0) {
      yield put({
        type: 'navigatorInformationController/handleOpenInformation',
        payload: {
          categoryCode: CategoryCode.AssessmentNotice,
        },
      });
    }
    // 更新pending
    yield put({
      type: 'envoyController/setCaseNo',
      payload: {
        caseNo: processInstanceId,
        taskId,
      },
    });

    // 更新模版页, assessmentType更新
    bpm.reload();

    /** -- auditLog -- */
    yield put({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.ReAssessment,
      },
    });
  }

  return response;
}
