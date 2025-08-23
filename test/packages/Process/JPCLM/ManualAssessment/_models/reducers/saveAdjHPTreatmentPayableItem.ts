import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import {v4 as uuidv4 } from 'uuid';
import { TREATMENTPAYABLEITEM } from '@/utils/claimConstant';

const addTreatmentPayableItem = ({ draftState, treatmentPayableItem, changedFields }: any) => {
  const treatmentPayableItemId = uuidv4();

  draftState.claimEntities.claimPayableListMap[
    treatmentPayableItem.payableId
  ].treatmentPayableList = [
    ...draftState.claimEntities.claimPayableListMap[treatmentPayableItem.payableId]
      .treatmentPayableList,
    treatmentPayableItemId,
  ];

  draftState.claimEntities.treatmentPayableListMap[treatmentPayableItemId] = {
    ...TREATMENTPAYABLEITEM,
    ...treatmentPayableItem,
    id: treatmentPayableItemId,
    isChangeNo: true,
    ...changedFields,
  };
};

const saveAdjOpTreatmentPayableItem = (state: any, action: any) => {
  const { treatmentPayableId, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) !== 1) return;
    let extra = {};

    const treatmentPayableItem =
      draftState.claimEntities.treatmentPayableListMap[treatmentPayableId];

    // TODO:这里用map去做
    if (lodash.has(changedFields, 'reversalFlag')) {
      const value = formUtils.queryValue(changedFields.reversalFlag);
      extra = {
        changeObjectAmount: !value ? null : Math.abs(treatmentPayableItem.payableAmount),
      };
    }

    draftState.claimEntities.treatmentPayableListMap[treatmentPayableId] = {
      ...draftState.claimEntities.treatmentPayableListMap[treatmentPayableId],
      ...changedFields,
      ...extra,
    };
  });

  return { ...nextState };
};

export default saveAdjOpTreatmentPayableItem;
