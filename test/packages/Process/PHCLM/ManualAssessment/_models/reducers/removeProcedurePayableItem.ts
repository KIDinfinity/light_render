import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { updateDuplicatePayableError } from '../functions';

const removeProcedurePayableItem = (state: any, action: any) => {
  const { treatmentPayableId, id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const draft = draftState;
    const editPayable = formUtils.cleanValidateData(draft.claimEntities.procedurePayableListMap[id]);
    updateDuplicatePayableError(
      draft,
      {
        editPayable,
        benefitItemCode: editPayable.benefitItemCode,
      },
      'procedurePayable'
    );
    const procedurePayableList = lodash.get(
      draft,
      `claimEntities.treatmentPayableListMap.${treatmentPayableId}.procedurePayableList`,
      []
    );
    const newRadiationList = lodash.filter(procedurePayableList, (item) => item !== id);
    draft.claimEntities.treatmentPayableListMap[
      treatmentPayableId
    ].procedurePayableList = newRadiationList;
    delete draft.claimEntities.procedurePayableListMap[id];
  });

  return { ...nextState };
};

export default removeProcedurePayableItem;
