import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { current, type: modalType, parentVersionNo } = payload;
  yield put({
    type: 'saveModal',
    payload: {
      current,
      modalType,
      parentVersionNo,
      showModal: true,
    },
  });
}
