export default function* saveClaimProcessDataListener({ payload }: any, { put, takeLatest }: any) {
  yield takeLatest(
    ['apOfClaimAssessmentController/saveClaimProcessData'],
    function* action(action: any) {
      yield put({
        type: 'formCommonController/saveDecisionsBGColor',
        payload: action.payload,
      });

      yield put({
        type: 'navigatorInformationController/loadFirstPage',
      });
    }
  );
}
