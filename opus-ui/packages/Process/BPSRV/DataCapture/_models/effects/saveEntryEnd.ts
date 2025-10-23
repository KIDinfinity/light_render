import reducers from '../reducers';
import { NAMESPACE } from '../../activity.config';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

const saveEntryEnd = [
  // eslint-disable-next-line func-names
  function* ({ payload }: any, { put, select, call }: any) {
    yield call(delay, 1);

    const sequence: any[] = yield select(({ sequence }: any) => sequence.sequence);
    let newState: object = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace);

    sequence.forEach(({ target, payload: sequencePayload }: any) => {
      const currentReducer = reducers?.[target];

      if (currentReducer) {
        newState = currentReducer(newState, {
          type: target,
          validating: true,
          payload: sequencePayload,
        });
      }
    });

    if (reducers.link) {
      newState = reducers.link(newState, {
        type: 'link',
        payload,
      });
    }

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
