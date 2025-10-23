import { manualEscalateAssignee } from '@/services/bpmTaskControllerV2Service';
import { saveInformation } from '@/services/navigatorInformationControllerV2Service';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default function* ({ payload }: any, { call, put, select }: any) {
  const userId = yield select((state) => state.user.currentUser.userId);
  const businessData = yield select((state: any) => state.processTask.getTask);
  const assigneeAndTeamList = yield select(
    (state: any) => state.newBusinessManualUnderwriting.assigneeAndTeamList
  );
  const categoryReasons = yield select(
    (state: any) => state.newBusinessManualUnderwriting.categoryReasons || [{}]
  );
  const escalate = yield select(
    (state: any) => state.newBusinessManualUnderwriting?.informationForm
  );
  const escalateInfo = formUtils.cleanValidateData(escalate);
  let extaParams = {};
  if (!escalateInfo?.teamOrUser && escalateInfo?.reason) {
    const user = {
      escalateReason: escalateInfo.reason,
    };
    extaParams = {
      user,
    };
  } else {
    lodash.map(assigneeAndTeamList, (item) => {
      if (escalateInfo?.teamOrUser === item?.userId) {
        return (extaParams = {
          user: item,
        });
      }
      if (escalateInfo?.teamOrUser === item?.teamCode) {
        return (extaParams = {
          team: item,
        });
      }
    });
  }
  const submitData = {
    author: userId,
    procActivityKey: businessData?.activityKey,
    category: 'EscalateReason',
    effectiveDate: Date.now(),
    expiryDate: 32503564800000,
    content: `<p><i>${escalateInfo?.comment || ''}</i></p>`,
    informationLinkToList: [
      {
        linkToKey: 'case',
        linkToValue: businessData?.caseNo,
      },
    ],
    infoReasons: [
      {
        categoryCode: categoryReasons[0]?.fieldName,
        modifier: userId,
        reasonCode: escalateInfo?.reason,
        reasonType: categoryReasons[0]?.fieldName,
        reasonTypeOrder: categoryReasons[0]?.reasonTypeOrder,
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
    reason: escalateInfo?.reason,
    ...lodash.pick(businessData, [
      'businessCode',
      'processInstanceId',
      'taskId',
      'caseNo',
      'caseCategory',
    ]),
  };
  const response = yield call(manualEscalateAssignee, {
    ...lodash.pick(businessData, ['activityKey', 'caseCategory', 'businessNo', 'taskId', 'caseNo']),
    ...extaParams,
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && !!resultData) {
    if (success) {
      yield call(saveInformation, { ...submitData });
      return {
        success,
        resultData,
      };
    }
  }
}
