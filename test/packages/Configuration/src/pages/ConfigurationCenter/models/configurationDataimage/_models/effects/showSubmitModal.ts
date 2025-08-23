import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { submitRow } = payload;
  yield put({
    type: 'saveModal',
    payload: {
      submitRow,
      showSubmitModal: true,
    },
  });
}
