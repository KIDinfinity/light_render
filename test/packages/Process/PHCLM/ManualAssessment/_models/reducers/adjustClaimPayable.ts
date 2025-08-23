import { modifyAllLayerOfPayable } from '../functions/utils';
import { keyMap } from '../functions/adjustmentMapUtils';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const { isPayableAdjusted, claimPayableId } = action.payload || {};

  const localKeymap = isPayableAdjusted ? keyMap : keyMap.map((arr) => arr.toReversed());

  const nextState = produce(state, (draftState) => {
    const claimPayable = draftState.claimEntities.claimPayableListMap[claimPayableId];
    modifyAllLayerOfPayable(claimPayable, draftState.claimEntities, (payable) => {
      payable.isPayableAdjusted = isPayableAdjusted;
      localKeymap.map(([fromField, toField]) => {
        payable[toField] = payable[fromField];
        payable[fromField] = null;
      });
    });
  });

  return { ...nextState };
};
