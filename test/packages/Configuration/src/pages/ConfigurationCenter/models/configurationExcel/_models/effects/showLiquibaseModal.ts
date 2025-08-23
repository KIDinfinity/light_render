import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* ({ payload }: PayProps, { put }: SagaProps) {
  const { rows } = payload;
  yield put({
    type: 'saveModal',
    payload: {
      showLiquibaseModal: true,
      rows,
    },
  });
}
