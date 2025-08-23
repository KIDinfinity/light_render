import { modifyAllLayerOfPayable } from '../functions/utils';
import { keyMap } from '../functions/adjustmentMapUtils';

export default (state: any, action: any) => {
  const { isPayableAdjusted, claimPayableId } = action.payload || {};
  const claimPayable = state.claimEntities.claimPayableListMap[claimPayableId];
  const localKeymap = isPayableAdjusted? keyMap : keyMap.map(arr => arr.toReversed());

  modifyAllLayerOfPayable(claimPayable, state.claimEntities, payable => {
    payable.isPayableAdjusted = isPayableAdjusted;
    localKeymap.map(([fromField, toField]) => {
      payable[toField] = payable[fromField];
      payable[fromField] = null;
    })
  })
}
