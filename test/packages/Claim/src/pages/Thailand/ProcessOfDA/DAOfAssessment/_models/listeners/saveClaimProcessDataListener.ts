export default function* saveClaimProcessDataListener(_: any, { put, takeLatest }: any) {
  yield takeLatest(
    ['daOfClaimAssessmentController/saveClaimProcessData'],
    function* action({ payload }: any) {
      yield put({
        type: 'formCommonController/saveFormListBGColor',
        payload,
      });
      yield put({
        type: 'saveClaimProcessDataCallback',
        payload,
      });

      yield put({
        type: 'navigatorInformationController/loadFirstPage',
      });
    }
  );
}
