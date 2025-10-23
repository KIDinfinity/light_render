import { Mode } from 'configuration/constant';

export default function* ({ payload }: any, { put }: any) {
  const { taskId } = payload;
  yield put({
    type: 'saveMode',
    payload: {
      mode: Mode.Expansion,
    },
  });
  yield put({
    type: 'showModal',
    payload: {
      modalTaskId: taskId,
    },
  });
  yield put({
    type: 'hidePreviewModal',
  });
}
