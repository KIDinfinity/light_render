export function* selectDocItemListener(action: any, { put, takeEvery, select }: any) {
  yield takeEvery(`documentManagement/selectDocItem`, function* act({ payload }: any) {
    const { selectedDocId } = payload || {};

    yield put({
      type: 'disableTools',
      payload: {
        disabled: !selectedDocId,
      },
    });
  });
}

export default selectDocItemListener;
