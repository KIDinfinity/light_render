import { Action } from '../../Enum';

export default function* ({ payload }: any, { put }: any) {
  const {
    action,
    processInstanceId,
    procActivityKey,
    taskId,
    activityKey,
  } = payload;

  if (!action) return;

  const params = {
    action,
    processInstanceId,
    procActivityKey,
    taskId,
    activityKey,
  };

  yield put({
    type: 'logButton',
    payload:
      action === Action.Assign
        ? payload
        : params,
  })

}
