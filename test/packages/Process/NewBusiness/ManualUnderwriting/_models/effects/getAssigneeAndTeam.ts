import lodash from 'lodash';
import { findAssigneeAndTeam } from '@/services/bpmPendingInformationManagementService';
export default function* ({ payload }: any, { call, put, select }: any) {
  const businessData = yield select((state: any) => state.processTask.getTask);
  const response = yield call(findAssigneeAndTeam, {
    ...lodash.pick(businessData, ['activityKey', 'caseCategory', 'businessNo']),
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    const assigneeAndTeamList = [
      ...resultData?.teamList,
      ...resultData?.havePermissionUserInfoList,
    ];
    yield put({
      type: 'setAssigneeAndTeamList',
      payload: {
        assigneeAndTeamList,
      },
    });
  }
}
