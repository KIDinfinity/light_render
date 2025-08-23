import { produce } from 'immer';
import lodash from 'lodash';

const removeFeeItemList = (state: any, action: any) => {
  const { serviceItemId } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;

    if (serviceItemId) {
      lodash.forEach(
        lodash.cloneDeep(draftState.claimEntities?.serviceItemListMap[serviceItemId].feeItemList),
        (feeItemId) => {
          delete draftState.claimEntities.feeItemListMap[feeItemId];
        }
      );

      draftState.claimEntities.serviceItemListMap[serviceItemId].feeItemList = [];
    }
  });
  return { ...nextState };
};

export default removeFeeItemList;
