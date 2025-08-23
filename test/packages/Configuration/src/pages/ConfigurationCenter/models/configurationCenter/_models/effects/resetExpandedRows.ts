import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  yield put({
    type: 'saveReset',
    payload: {
      expandedRows: [],
      ...payload,
    },
  });
}
