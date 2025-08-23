import { produce } from 'immer';
import lodash from 'lodash';
import { getManualAdd } from '../functions/fnObject';

const saveLifePayable = (state: any, action: any) => {
  const { claimEntities, benefitItemManualAddMap } = state;
  const { changedFields, incidentPayableId } = action.payload;
  const incidentPayableItem = claimEntities.claimPayableListMap[incidentPayableId];
  const editPayableItem = {
    ...incidentPayableItem,
    lifePayable: {
      ...incidentPayableItem.lifePayable,
      ...changedFields,
    },
  };

  if (lodash.has(changedFields, 'benefitItemCode')) {
    editPayableItem.lifePayable.manualAdd = getManualAdd(
      benefitItemManualAddMap,
      changedFields.benefitItemCode.value
    );
  }

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.claimPayableListMap[incidentPayableId] = editPayableItem;
  });

  return { ...nextState };
};

export default saveLifePayable;
