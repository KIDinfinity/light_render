import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  yield put({
    type: 'save',
    payload: {
      ...payload,
    },
  });
}
