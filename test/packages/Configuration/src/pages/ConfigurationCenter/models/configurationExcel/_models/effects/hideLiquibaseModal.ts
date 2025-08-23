import type {
  PayProps,
  SagaProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';

export default function* (_: PayProps, { put }: SagaProps) {
  yield put({
    type: 'saveModal',
    payload: {
      showLiquibaseModal: false,
    },
  });
}
