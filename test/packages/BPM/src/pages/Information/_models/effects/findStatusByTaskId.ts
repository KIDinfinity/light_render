import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getTask } from '@/services/navigatorCaseManagementControllerService';
import type { IEffects } from '../interfaces';

/**
 * 加载节点状态
 * @param taskId
 */
export default function* findStatusByTaskId(data: any, { put, select }: IEffects) {
  const { taskId } = yield select((state: any) => state.navigatorInformationController);
  let taskDetail = data?.payload?.taskDetail
  if(!taskDetail) {
    const response = yield getTask(
      objectToFormData({
        taskId,
      })
    );
    taskDetail = response.resultData;
  }


  const taskStatus = lodash.get(taskDetail, 'taskStatus', '');
  const assignee = lodash.get(taskDetail, 'assignee', '');
  yield put({
    type: 'setCurrentTaskStatus',
    payload: {
      taskStatus,
    },
  });
  yield put({
    type: 'setCurrentTaskAssignee',
    payload: {
      assignee,
    },
  });
}
