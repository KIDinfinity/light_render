export default function* saveErrorCountListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    ['daProcessController/saveBasicInformation', 'daProcessController/saveTreatmentItem'],
    function* action() {
      yield put({
        type: 'updateErrorCount',
      });
    }
  );
}
