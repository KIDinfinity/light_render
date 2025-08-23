import { produce }  from 'immer';
import lodash from 'lodash';
import links from '../links';

const treatmentUpdate = (state: any, action: any) => {
  const { changedFields, treatmentId } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...draftState.claimEntities.treatmentListMap[treatmentId],
      ...changedFields,
    };

    if (lodash.size(changedFields) === 1) {
      links.treatment_treatmentType({ draftState, changedFields, treatmentId });
      links.treatment_medicalProvider({ draftState, changedFields, treatmentId });
    }
  });
  return { ...nextState };
};

export default treatmentUpdate;
