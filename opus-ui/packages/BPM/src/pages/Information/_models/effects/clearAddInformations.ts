import type { IEffects } from '../interfaces/index';

export default function* clearAddInformations(_: any, { put }: IEffects) {
  yield put.resolve({
    type: 'setAddInformations',
    payload: {
      record: [],
    },
  });
}
