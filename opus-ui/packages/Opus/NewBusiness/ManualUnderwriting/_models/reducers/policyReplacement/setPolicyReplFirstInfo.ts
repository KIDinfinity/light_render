import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';

type TAction = {
  type: any;
  payload: {
    changedFields: any;
  };
};

export default (state: any, action: TAction) => {
  const { changedFields } = action.payload;
  const old = state?.modalData?.policyReplacement?.replacementFirstInfo;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.policyReplacement.replacementFirstInfo = { ...old, ...changedFields };

    const replacementFirstInfo = draftState.modalData.policyReplacement.replacementFirstInfo;
    if (
      lodash.some(
        formUtils.formatFlattenValue(formUtils.cleanValidateData(replacementFirstInfo)),
        (value) => value === 'Y'
      )
    ) {
      draftState.modalData.policyReplacement.policyReplacementFlag = 'Y';
    } else {
      draftState.modalData.policyReplacement.policyReplacementFlag = 'N';
    }
  });
  return { ...nextState };
};
