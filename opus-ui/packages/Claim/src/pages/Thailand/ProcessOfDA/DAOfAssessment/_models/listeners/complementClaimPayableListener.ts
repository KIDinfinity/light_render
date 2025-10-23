export default function* complementClaimPayableListener(_, { put, takeLatest }: any) {
  yield takeLatest(
    [
      'daOfClaimAssessmentController/saveClaimProcessData',
      'daOfClaimAssessmentController/saveListPolicy',
    ],
    function* action() {
      yield put({
        type: 'complementClaimPayableCallback',
      });
    }
  );
}
