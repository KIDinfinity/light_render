import { produce } from 'immer';
import lodash from 'lodash';

const removeProcedurePayableItem = (state: any, action: any) => {
  const { treatmentPayableId, id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;

    const procedurePayableList = lodash.get(
      draft,
      `claimEntities.treatmentPayableListMap.${treatmentPayableId}.procedurePayableList`,
      []
    );
    const newRadiationList = lodash.filter(procedurePayableList, (item) => item !== id);
    draft.claimEntities.treatmentPayableListMap[treatmentPayableId].procedurePayableList =
      newRadiationList;
    delete draft.claimEntities.procedurePayableListMap[id];
  });

  return { ...nextState };
};

export default removeProcedurePayableItem;
