import type { IEffects } from '../interfaces/index';

export default function* updateReadStatusLocal({ payload }: any, { put }: IEffects) {
  yield put({
    type: 'updateAllCategoryHistoryReadStatus',
    payload,
  });
}
