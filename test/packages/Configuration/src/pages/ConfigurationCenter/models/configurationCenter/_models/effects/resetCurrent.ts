import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* (_: PayProps, { put }: SagaProps) {
  yield put({
    type: 'save',
    payload: {
      current: {},
    },
  });
}
