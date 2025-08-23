export default function* saveClaimProcessDataListener(
  { payload }: any,
  { put, takeLatest, select }: any
) {
  yield takeLatest(
    ['hbOfClaimAssessmentController/saveClaimProcessData'],
    function* action(action: any) {
      yield put({
        type: 'formCommonController/saveFormListBGColor',
        payload: action.payload.daClaimAssessmentVO || action.payload.daClaimCaseVO,
      });
      yield put({
        type: 'hbOfClaimAssessmentController/queryListPolicy',
      });

      yield put({
        type: 'saveClaimProcessDataCallback',
        payload,
      });
    }
  );
}
