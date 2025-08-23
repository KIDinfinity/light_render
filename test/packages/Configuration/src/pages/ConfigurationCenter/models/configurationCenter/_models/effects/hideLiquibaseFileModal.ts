
export default function* (_: PayProps, { put }: SagaProps) {
  yield put({
    type: 'saveModal',
    payload: {
      liquibaseFiles: [],
      showLiquibaseFileModal: false,
    },
  });
}




