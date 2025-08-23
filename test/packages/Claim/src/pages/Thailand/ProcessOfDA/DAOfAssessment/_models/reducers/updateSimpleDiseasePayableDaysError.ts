import { produce } from 'immer';
import lodash from 'lodash';

const updateSimpleDiseasePayableDaysError = (state: any, action: any) => {
  const { errors } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.simpleDiseasePayableDaysError = !lodash.isEmpty(errors)
      ? [
          'claimPayableList[0].treatmentPayableList[0].invoic…eList[0].assessorOverrideAmount.errors[0].message',
        ]
      : [];
  });

  return { ...nextState };
};

export default updateSimpleDiseasePayableDaysError;
