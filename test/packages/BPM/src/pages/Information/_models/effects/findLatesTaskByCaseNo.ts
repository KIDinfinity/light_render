import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { serialize as objectToFormData } from 'object-to-formdata';
import bpmProcessTaskService from '@/services/bpmProcessTaskService';
import type { IEffects } from '../interfaces/index';

/**
 * 加载节点状态
 * @param caseNo
 */
export default function* findLatesTaskByCaseNo(_, { call, put, select }: IEffects) {
  const { informationData } = yield select((state) => state.navigatorInformationController);
  const caseNo = formUtils.queryValue(informationData?.caseNo);
  const response = yield call(
    bpmProcessTaskService.findLatesTaskByCaseNo,
    objectToFormData({
      caseNo,
    })
  );

  const taskStatus = lodash.get(response, 'resultData.taskStatus', '');
  const assignee = lodash.get(response, 'resultData.assignee', '');
  const latestaskId = lodash.get(response, 'resultData.taskId', '');
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
  yield put({
    type: 'setLatesTaskId',
    payload: {
      latestaskId,
    },
  });
}
