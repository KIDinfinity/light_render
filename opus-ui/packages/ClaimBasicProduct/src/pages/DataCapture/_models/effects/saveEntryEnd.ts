/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import reducers from '../reducers';
import lodash from 'lodash';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

let formLength: number = 0;
let firstExecute = true;

const saveEntryEnd = [
  // eslint-disable-next-line func-names
  function* ({ payload }: any, { put, select, call }: any) {
    yield call(delay, 1);

    const sequence = yield select((state: any) => state.sequence.sequence);
    const forms = yield select((state: any) => state.formCommonController.forms);

    if (firstExecute) {
      formLength = lodash.keys(forms).length;
    }

    if (formLength !== 0 && formLength !== sequence.length) {
      firstExecute = false;
      console.error(
        `The length of forms is not equal to the sequence of actions: at saveEntryEnd()`
      );
      console.log(`forms:\n`, lodash.keys(forms), `sequence:\n`, sequence);

      return;
    }

    let cacheState = yield select((state: any) => state.bpOfDataCaptureController);

    // eslint-disable-next-line array-callback-return
    lodash.map(sequence, ({ target, payload }: any) => {
      const currentReducer = reducers?.[target];

      if (currentReducer) {
        cacheState = currentReducer(cacheState, {
          type: target,
          payload,
        });
      }
    });

    yield put({
      type: 'saveState',
      payload: cacheState,
    });

    yield put({
      type: 'sequence/clear',
    });

    if ((!firstExecute && formLength !== 0) || formLength === sequence.length) {
      firstExecute = true;
      formLength === 0;
    }
  },
  {
    type: 'takeLatest',
  },
];

export default saveEntryEnd;
