import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* s({ payload }: PayProps, { put }: SagaProps) {
  const { expandedRows } = payload;
  yield put({
    type: 'save',
    payload: {
      expandedRows,
    },
  });
}
