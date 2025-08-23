/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { mapForHandle } from 'process/Utils/benefitCategoryUtils';

// claimPayableListMap -> claimPayableListMap
// claimPayableList -> claimPayableList

const handleDelete = ({ draftState, id, benefitCategory, dex = 0 }: any) => {
  const mapKey = mapForHandle?.[benefitCategory]?.[dex]?.mapKey;
  const listKey = mapForHandle?.[benefitCategory]?.[dex]?.listKey;
  const parentKey = mapForHandle?.[benefitCategory]?.[dex]?.parentKey;
  const parentIdKey = mapForHandle?.[benefitCategory]?.[dex]?.parentIdKey;
  const parentId = draftState.claimEntities?.[mapKey]?.[id]?.[parentIdKey];
  delete draftState.claimEntities?.[mapKey][id];
  if (parentId) {
    const relationship = lodash.filter(
      draftState.claimEntities?.[parentKey]?.[parentId]?.[listKey],
      (item) => item !== id
    );
    draftState.claimEntities[parentKey][parentId][listKey] = relationship;
    if (lodash.size(relationship) === 0) {
      handleDelete({ draftState, id: parentId, benefitCategory, dex: dex + 1 });
    }
  }
};

/**
 * PHCLM_ManulAssessment显示的Treatment是C类型的，没有InvoicePayable与ServicePayable
 * @param state
 * @param action
 * @returns
 */
const removeTreatmentPayableItem = (state: any, action: any) => {
  // claimPayableItemId就是incidentPayableId
  const { id, benefitCategory } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    handleDelete({ draftState, id, benefitCategory });
    draftState.claimProcessData.claimPayableList = lodash.map(
      draftState.claimEntities.claimPayableListMap,
      (item) => item?.id
    );
  });

  return { ...nextState };
};

export default removeTreatmentPayableItem;
