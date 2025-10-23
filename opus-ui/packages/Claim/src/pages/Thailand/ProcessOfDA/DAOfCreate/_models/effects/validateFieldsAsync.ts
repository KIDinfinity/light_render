

export default function* validateFieldsAsync({ payload }: any, { select, put, take }: any) {
  const { errors } = payload;
  yield put({
    type: 'saveErrorCount',
    payload: {
      errorCount: errors.length,
    },
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });
  return errors;
}
