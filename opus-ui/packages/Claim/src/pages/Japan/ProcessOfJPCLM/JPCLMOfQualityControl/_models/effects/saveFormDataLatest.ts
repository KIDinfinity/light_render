const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

export default [
  function* ({ target, payload }: any, { put, select, call }: any) {
    const { documentId } = payload;
    const { documentTypeCode, submited, doneBusinessCheck } = yield select((state: any) => ({
      documentTypeCode:
        state.JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId]
          .formData.documentTypeCode,
      doneBusinessCheck: state.JPCLMOfQualityController.doneBusinessCheck,
      submited: state.formCommonController.submited,
    }));
    yield call(delay, 10);
    yield put({
      type: target,
      payload: {
        ...payload,
        documentTypeCode,
        submited,
      },
    });
    if (doneBusinessCheck) {
      yield put({
        type: 'saveDoneBusinessCheck',
        payload: {
          doneBusinessCheck: false,
        },
      });
    }
  },
  { type: 'takeLatest' },
];
