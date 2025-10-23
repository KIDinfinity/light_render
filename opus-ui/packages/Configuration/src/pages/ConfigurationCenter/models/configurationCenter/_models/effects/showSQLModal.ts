import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { SQLDatasourceName } = payload;
  yield put({
    type: 'saveSQLModal',
    payload: {
      SQLDatasourceName,
      showSQLModal: true,
    },
  });
}
