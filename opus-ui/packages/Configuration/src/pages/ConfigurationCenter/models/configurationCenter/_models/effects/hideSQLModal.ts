import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* (_: PayProps, { put }: SagaProps) {
  yield put({
    type: 'saveSQLModal',
    payload: {
      SQLDatasourceName: undefined,
      showSQLModal: false,
    },
  });
}
