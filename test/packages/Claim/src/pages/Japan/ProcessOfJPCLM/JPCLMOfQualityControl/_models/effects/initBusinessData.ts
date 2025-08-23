import lodash from 'lodash';
import { getClaimProcessData } from '../../Utils';
import { TaskStatus } from '../../Enum';

const isComplete = (taskStatus: string) => lodash.toLower(taskStatus) === TaskStatus.Completed;

export default function* ({ payload }: any, { put }: any) {
  const {
    businessNo,
    taskStatus,
    parentClaimNo,
    processInstanceId,
    onOkFn,
    assignee,
    submissionChannel,
    businessData,
  } = payload;
  const snapShotData = {};
  const isEmptySnapShot = true;
  const isCompleteTask = isComplete(taskStatus);

  const claimProcessData = getClaimProcessData({
    snapShotData,
    claimData: {
      ...businessData,
      ...(lodash.isEmpty(businessData) ? {} : { submissionChannel }),
    },
    isCompleteTask,
    isEmptySnapShot,
    parentClaimNo,
  });

  yield put({
    type: 'saveClaimProcessData',
    payload: claimProcessData,
  });

  if (!isCompleteTask) {
    yield put({
      type: 'udMessageController/initUDMessage',
      payload: {
        claimNo: businessNo,
        processInstanceId,
        assignee,
        onOkFn,
      },
    });
  }
}
