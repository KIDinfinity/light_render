import { namespace } from '../../_dto/Consts';

export default function* saveEntry({ target, payload }: any, { put }: any) {
  yield put({
    type: 'sequence/add',
    payload: {
      target,
      payload,
      namespace,
    },
  });

  yield put({
    type: 'saveEntryEnd',
  });
}
