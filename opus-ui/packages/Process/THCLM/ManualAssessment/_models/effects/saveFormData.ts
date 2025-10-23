import { dateValidateConfig } from '../../activity.config';

export default [
  function* saveFormData({ target, payload }: any, { put }: any) {
    yield put({
      type: target,
      payload,
    });

    yield put({
      type: 'link',
      payload: {
        ...payload,
        config: dateValidateConfig,
      },
    });
  },
  { type: 'takeLatest' },
];
