import { saveInformation } from '@/services/navigatorInformationControllerV2Service';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default function* ({ payload }: any, { call, put, select }: any) {
  const userId = yield select((state) => state.user.currentUser.userId);
  const businessData = yield select((state: any) => state.processTask.getTask);
  const assigneeAndTeamList = yield select(
    (state: any) => state.newBusinessManualUnderwriting.assigneeAndTeamList
  );
  const cancelReasons = yield select((state: any) => state.newBusinessManualUnderwriting || [{}]);
  const cancelForm = yield select(
    (state: any) => state.newBusinessManualUnderwriting?.informationForm
  );
  const cancelInfo = formUtils.cleanValidateData(cancelForm);
  const submitData = {
    author: userId,
    procActivityKey: businessData?.activityKey,
    category: 'Cancel',
    effectiveDate: Date.now(),
    expiryDate: 32503564800000,
    content: `<p><i>${cancelInfo?.comment || ''}</i></p>`,
    informationLinkToList: [
      {
        linkToKey: 'case',
        linkToValue: businessData?.caseNo,
      },
    ],
    infoReasons: [
      {
        categoryCode: cancelInfo?.fieldName,
        modifier: userId,
        reasonCode: cancelInfo?.cancelReason,
        reasonType: 'cancel',
        typeCode: 'Dropdown_INF_CancelReason',
        ...lodash.pick(businessData, [
          'businessNo',
          'caseCategory',
          'caseNo',
          'businessCode',
          'inquiryBusinessNo',
          'processInstanceId',
          'taskId',
        ]),
      },
    ],
    status: 'P',
    defaultDate: 1,
    reason: cancelInfo?.cancelReason,
    ...lodash.pick(businessData, [
      'businessCode',
      'processInstanceId',
      'taskId',
      'caseNo',
      'caseCategory',
    ]),
  };

  const response = yield call(saveInformation, { ...submitData });

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    return {
      success,
      resultData,
    };
  }
}
