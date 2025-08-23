export default function* saveTreatmentItemListener({ payload }: any, { put, takeLatest }: any) {
  yield takeLatest(
    [
      'JPCLMOfClaimRegistrationController/saveTreatmentItem',
      'JPCLMOfClaimRegistrationController/saveProcedureItem',
    ],
    function* action({ payload }: any) {
      yield put({
        type: 'saveTreatmentItemCallback',
        payload,
      });
    }
  );
}
