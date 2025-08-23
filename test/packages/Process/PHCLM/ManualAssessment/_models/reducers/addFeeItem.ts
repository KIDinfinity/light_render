import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import { FEEITEM } from '@/utils/claimConstant';

const addFeeItem = (state: any, action: any) => {
  const { serviceItemId, changedValues } = action.payload;
  const nextState = produce(state, (draftState) => {
    const feeItemId = uuidv4();

    if (!draftState.claimEntities.serviceItemListMap[serviceItemId].feeItemList) {
      draftState.claimEntities.serviceItemListMap[serviceItemId].feeItemList = [];
    }

    draftState.claimEntities.serviceItemListMap[serviceItemId].feeItemList = [
      ...draftState.claimEntities.serviceItemListMap[serviceItemId].feeItemList,
      feeItemId,
    ];

    draftState.claimEntities.feeItemListMap[feeItemId] = {
      ...FEEITEM,
      claimNo: draftState.claimProcessData?.claimNo,
      id: feeItemId,
      serviceItemId,
      ...changedValues,
    };
  });

  return { ...nextState };
};

export default addFeeItem;
