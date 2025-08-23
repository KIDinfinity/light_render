/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import reducers from '../reducers';
import { NAMESPACE } from '../../activity.config';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

const saveEntryEnd = [
  // eslint-disable-next-line func-names
  function* ({ payload }: any, { put, select, call }: any) {
    yield call(delay, 1);

    const sequence = yield select(({ sequence }: any) => sequence.sequence);
    let newState = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace);
    // eslint-disable-next-line array-callback-return
    sequence.map(({ target, payload }: any) => {
      const currentReducer = reducers?.[target];

      if (currentReducer) {
        newState = currentReducer(newState, {
          type: target,
          payload,
        });
      }
    });

    yield put({
      type: 'saveState',
      payload: newState,
    });

    yield put({
      type: 'sequence/clear',
    });
  },
  {
    type: 'takeLatest',
  },
];

export default saveEntryEnd;
