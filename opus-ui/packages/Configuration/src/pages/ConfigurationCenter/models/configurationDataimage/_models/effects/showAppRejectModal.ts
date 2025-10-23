import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { appRejectRow, modalType } = payload;
  yield put({
    type: 'saveModal',
    payload: {
      appRejectRow,
      modalType,
      showAppRejectModal: true,
    },
  });
}
