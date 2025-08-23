export default function* saveAccidentBenefitPayableItemListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      'daOfClaimAssessmentController/saveClaimPayableItem',
      'daOfClaimAssessmentController/saveAccidentBenefitPayableItem',
      'daOfClaimAssessmentController/removeAccidentBenefitPayableItem',
    ],
    function* action(action: any) {
      yield put({
        type: 'saveAccidentBenefitPayableItemCallBack',
        payload: action.payload,
      });
    }
  );
}
