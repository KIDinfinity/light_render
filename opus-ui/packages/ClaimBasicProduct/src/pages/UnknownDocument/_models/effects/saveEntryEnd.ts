/* eslint-disable func-names */
import lodash from 'lodash';
import reducers from '../reducers';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

const saveEntryEnd = [
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function* ({ payload }: any, { put, select, call }: any) {
    yield call(delay, 1);

    const sequence = yield select((state: any) => state.sequence.sequence);
    let newState = yield select((state: any) => state.bpOfClaimAssessmentController);
    // eslint-disable-next-line array-callback-return
    lodash.map(sequence, ({ target, payload }: any) => {
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
