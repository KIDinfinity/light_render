import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { importErrors } = payload;
  yield put({
    type: 'save',
    payload: {
      importErrors,
    },
  });
}
