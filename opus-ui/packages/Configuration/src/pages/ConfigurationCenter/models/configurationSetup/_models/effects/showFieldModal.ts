import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { currentField } = payload;
  yield put({
    type: 'saveModal',
    payload: {
      currentField,
      showFieldModal: true,
    },
  });
}

