export default function* saveAccidentBenefitPayableItemListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      'PHCLMOfClaimAssessmentController/saveClaimPayableItem',
      'PHCLMOfClaimAssessmentController/saveAccidentBenefitPayableItem',
      'PHCLMOfClaimAssessmentController/removeAccidentBenefitPayableItem',
    ],
    function* action(action: any) {
      yield put({
        type: 'saveAccidentBenefitPayableItemCallBack',
        payload: action.payload,
      });
    }
  );
}
