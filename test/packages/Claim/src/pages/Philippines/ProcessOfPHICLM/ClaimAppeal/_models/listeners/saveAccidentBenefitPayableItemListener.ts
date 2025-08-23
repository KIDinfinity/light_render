export default function* saveAccidentBenefitPayableItemListener(_, { put, throttle }: any) {
  yield throttle(
    300,
    [
      'PHCLMOfAppealCaseController/saveClaimPayableItem',
      'PHCLMOfAppealCaseController/saveAccidentBenefitPayableItem',
      'PHCLMOfAppealCaseController/removeAccidentBenefitPayableItem',
    ],
    function* action(action: any) {
      yield put({
        type: 'saveAccidentBenefitPayableItemCallBack',
        payload: action.payload,
      });
    }
  );
}
