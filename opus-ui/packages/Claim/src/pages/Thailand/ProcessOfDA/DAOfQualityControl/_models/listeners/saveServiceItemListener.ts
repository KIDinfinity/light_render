export default function* saveServiceItemListener(_: any, { put, throttle }: any) {
  yield throttle(
    300,
    ['daOfClaimCaseController/saveServiceItem', 'daOfClaimCaseController/removeServiceItem'],
    function* action(ac: any) {
      yield put({
        type: 'saveServiceItemCallback',
        payload: ac.payload,
      });
    }
  );
}
