export default function* updatePaymentAmountListener(_: any, { put, throttle }: any) {
  yield throttle(
    300,
    [
      'JPCLMOfClaimAssessmentController/saveBeneficiaryItem',
      'JPCLMOfClaimAssessmentController/removeBeneficiaryItem',
    ],
    function* action() {
      yield put({
        type: 'updatePaymentAmountCallback',
      });
    }
  );
}
