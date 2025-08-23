import lodash from 'lodash';
import { manualEscalateAssignee } from '@/services/bpmTaskControllerV2Service';
import { formUtils } from 'basic/components/Form';
import { saveInformation } from '@/services/navigatorInformationControllerV2Service';

export default function* ({ payload }: any, { call, put, select }: any) {
  const userId = yield select((state) => state.user.currentUser.userId);
  const businessData = yield select((state: any) => state.processTask.getTask);
  const assigneeAndTeamList = yield select(
    (state: any) => state.newBusinessManualUnderwriting.assigneeAndTeamList
  );
  const escalate = yield select((state: any) => state.newBusinessManualUnderwriting?.escalte);
  const escalateInfo = formUtils.cleanValidateData(escalate);
  let extaParams = {};
  lodash.map(assigneeAndTeamList, (item) => {
    if (escalateInfo?.selectTeamOrUser === item?.userId) {
      return (extaParams = {
        user: item,
      });
    }
    if (escalateInfo?.selectTeamOrUser === item?.teamCode) {
      return (extaParams = {
        team: item,
      });
    }
  });
  const submitData = {
    author: userId,
    procActivityKey: businessData?.activityKey,
    category: 'EscalateReason',
    effectiveDate: Date.now(),
    expiryDate: 32503564800000,
    content: `<p><i>${escalateInfo?.escalationReason}</i></p>`,
    informationLinkToList: [
      {
        linkToKey: 'case',
        linkToValue: businessData?.caseNo,
      },
    ],
    status: 'P',
    defaultDate: 1,
    reason: null,
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
