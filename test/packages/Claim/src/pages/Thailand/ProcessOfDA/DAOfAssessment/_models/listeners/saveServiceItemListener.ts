export default function* saveServiceItemListener(_: any, { put, throttle }: any) {
  yield throttle(
    300,
    [
      'daOfClaimAssessmentController/saveServiceItem',
      'daOfClaimAssessmentController/removeServiceItem',
    ],
    function* action(ac: any) {
      yield put({
        type: 'saveServiceItemCallback',
        payload: ac.payload,
      });
    }
  );
}
