import lodash from 'lodash';
import reducers from '../reducers';
import { NAMESPACE, dateValidateConfig } from '../../activity.config';

const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default [
  function* saveEntryEnd({ payload }: any, { put, select, call }: any) {
    yield call(delay, 1);

    const sequence: Object[] = yield select(({ sequence }: any) => sequence.sequence);
    let newState: Object = yield select((state: any) => state[NAMESPACE]);

    lodash.forEach(sequence, ({ target, payload: sequencePaylod }: any) => {
      const currentReducer = reducers?.[target];

      if (currentReducer) {
        newState = currentReducer(newState, {
          type: target,
          payload: sequencePaylod,
        });
      }
    });

    if (reducers.link) {
      newState = reducers.link(newState, {
        type: 'link',
        payload: {
          ...payload,
          config: dateValidateConfig,
        },
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
