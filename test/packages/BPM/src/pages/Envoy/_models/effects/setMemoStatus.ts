import lodash from 'lodash';
import { updatePendingMemoStatus } from '@/services/navigatorEnvoyControllerService';
import handleMessageModal from '@/utils/commonMessage';
import addUpdateDate from '@/utils/addUpdateDate';

function* setMemoStatus(
  {
    payload,
  }: {
    payload: {
      pendingMemoId: string;
      status: string;
      groupId: string;
    };
  },
  { call, put, select }: any
) {
  let groupCode = '';
  const { pendingMemoId, status, groupId } = payload;
  const {
    activityKey,
    businessNo,
    caseCategory,
    taskId,
    caseNo,
    currentReasonGroups,
  } = yield select((state: any) =>
    lodash.pick(state.envoyController, [
      'activityKey',
      'businessNo',
      'caseCategory',
      'taskId',
      'caseNo',
      'currentReasonGroups',
    ])
  );
  lodash.forEach(currentReasonGroups, (group: any) => {
    const reasonDetails = lodash.get(group, 'reasonDetails', []);
    lodash.forEach(reasonDetails, (reason: any) => {
      const pendingMemoList = lodash.get(reason, 'pendingMemoList', []);
      lodash.forEach(pendingMemoList, (memoDetal: any) => {
        if (memoDetal?.id === pendingMemoId) {
          groupCode = group?.groupCode;
        }
      });
    });
  });
  const response = yield call(updatePendingMemoStatus, {
    groupCode,
    caseNo,
    taskId,
    businessNo,
    caseCategory,
    activityKey,
    pendingMemoId,
    status,
  });

  if (response.success === false) {
    const promptMessages = lodash.get(response, 'promptMessages', []);
    handleMessageModal(promptMessages);
  }

  if (lodash.isPlainObject(response) && response?.success) {
    yield addUpdateDate(caseNo);
    yield put.resolve({
      type: 'updateEnvoyData',
      payload: {
        oldData: lodash
          .chain(currentReasonGroups)
          .find({
            id: groupId,
          })
          .value(),
        newData: response.resultData,
      },
    });
    yield put({type: 'saveGetProcessJobInfoTimeStamp'});
  }
  return response?.resultData;
}

export default setMemoStatus;
