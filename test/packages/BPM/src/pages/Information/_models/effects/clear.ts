import type { IEffects } from '../interfaces/index';

export default function* clear(_, { put }: IEffects) {
  yield put.resolve({
    type: 'clearInformation',
  });

  yield put.resolve({
    type: 'setTaskId',
    payload: {
      taskId: '',
    },
  });
}
