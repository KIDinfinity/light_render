import { saveInformation } from '@/services/navigatorInformationControllerV2Service';
import { permissionValidate } from '@/services/owbNbAppealControllerService';
import { formUtils } from 'basic/components/Form';
import { serialize as objectToFormData } from 'object-to-formdata';
import { tenant, Region } from '@/components/Tenant';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import { findLatesTaskByCaseNo } from '@/services/bpmProcessTaskService';
import CaseCategory from 'basic/enum/CaseCategory';
import handleMessageModal from '@/utils/commonMessage';

export default function* (_: any, { call, put, select }: any) {
  const userId = yield select((state) => state.user.currentUser.userId);
  const businessData = yield select((state: any) => {
    return state[NAMESPACE]?.businessData;
  });
  const caseNo = businessData?.caseNo;
  const categoryReasons = yield select(
    (state: any) => state.newBusinessManualUnderwriting.categoryReasons || [{}]
  );
  const formData = yield select(
    (state: any) => state.newBusinessManualUnderwriting?.informationForm
  );
  const formInfo = formUtils.cleanValidateData(formData);

  const taskIdRes = yield call(findLatesTaskByCaseNo, objectToFormData({ caseNo }));

  if (!taskIdRes?.success) {
    return;
  }

  const taskId = lodash.get(taskIdRes, 'resultData.taskId');

  const submitData = {
    author: userId,
    procActivityKey: 'HIS_NB_001', // nb history 固定值
    category: 'appealNote',
    effectiveDate: Date.now(),
    expiryDate: 32503564800000,
    content: `<p><i>${formInfo?.comment || ''}</i></p>`,
    informationLinkToList: [
      {
        linkToKey: 'case',
        linkToValue: caseNo,
      },
    ],
    infoReasons: [
      {
        categoryCode: categoryReasons[0]?.fieldName,
        modifier: userId,
        reasonCode: formInfo?.reason,
        reasonType: categoryReasons[0]?.fieldName,
        reasonTypeOrder: categoryReasons[0]?.reasonTypeOrder,
        caseCategory: 'HIS_NB_001', // nb history 固定值
        taskId,
        processInstanceId: caseNo,
        caseNo,
        ...lodash.pick(businessData, ['businessNo', 'businessCode', 'inquiryBusinessNo']),
      },
    ],
    status: 'P',
    defaultDate: 1,
    reason: formInfo?.reason,
    caseCategory: 'HIS_NB_001', // nb history 固定值
    taskId,
    processInstanceId: caseNo,
    caseNo,
    ...lodash.pick(businessData, ['businessCode']),
  };

  yield call(saveInformation, { ...submitData });

  const params = {
    activityVariables:
      tenant.region() !== Region.TH
        ? {
            applicant: userId,
          }
        : null,
    businessNo: businessData?.applicationNo,
    caseCategory: CaseCategory.BP_AP_CTG02,
    operationType: 'asyncAppealCreate',
    caseNo,
    inquiryBusinessNo: businessData?.inquiryApplicationNo,
  };

  const reopenRes = yield put.resolve({
    type: 'workspaceCases/asyncTouch',
    payload: { params },
  });

  const { success, resultData } = lodash.pick(reopenRes, ['success', 'resultData']);

  if (success) {
    return {
      success,
      resultData,
    };
  }
}
