import type { IEffects } from '../interfaces/index';

/**
 * 设置 processInstanceId
 * @param {String} processInstanceId
 * @param {String} taskId
 * @param {String} defaultActivityCode
 * @param {String} defaultCategoryCode
 * @param {String} dataKey caseNo/taskId
 */
export default function* saveProcessInstanceIdReducer({ payload }: any, { put }: IEffects) {
  const { processInstanceId, taskId } = payload;
  yield put.resolve({
    type: 'clear',
  });
  yield put.resolve({
    type: 'setTaskId',
    payload: { taskId },
  });
  yield put({
    type: 'setData',
    payload,
  });
  yield put({
    type: 'mergeInformation',
    payload: {
      changedFields: {
        caseNo: processInstanceId,
      },
    },
  });
}
