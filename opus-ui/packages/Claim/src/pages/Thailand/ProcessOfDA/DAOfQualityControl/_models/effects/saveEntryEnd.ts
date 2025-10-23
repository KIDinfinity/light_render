import lodash from 'lodash';
import reducers from '../reducers';

const saveEntryEnd = [
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function* ({ payload }: any, { put, select, call }: any) {
    const sequence = yield select((state: any) => state.sequence.sequence);
    const forms = yield select((state) => state.formCommonController.forms);
    if (lodash.size(sequence) !== lodash.size(forms)) return;
    let newState = yield select((state: any) => state.daOfClaimCaseController);
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
