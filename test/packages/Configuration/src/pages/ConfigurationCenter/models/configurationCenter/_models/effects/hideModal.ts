import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* (_utils: PayProps, { put }: SagaProps) {
  yield put({
    type: 'saveModal',
    payload: {
      showModal: false,
    },
  });
}
