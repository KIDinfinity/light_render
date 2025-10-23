import { produce } from 'immer';
import lodash, { get } from 'lodash';
import { complementClaimPayableItem } from '../functions/complementClaimPayableItem';
import { getMappingPolicy, newPayableBoolean, validatePayableDuplicate } from '../functions/utils';
import { formUtils } from 'basic/components/Form';
import { ClaimDecision } from '../dto';

const complementClaimPayableCallback = (state: any) => {
  const { listPolicy, claimEntities } = state;
  if (lodash.isEmpty(listPolicy) || lodash.isEmpty(claimEntities)) {
    return state;
  }
  const nextState = produce(state, (draftState: any) => {
    const { claimPayableListMap } = claimEntities;

    lodash.forEach(claimPayableListMap, (claimPayableItem) => {
      if (
        formUtils.queryValue(claimPayableItem.claimDecision) !== ClaimDecision.deny &&
        newPayableBoolean(claimPayableItem, claimEntities, claimPayableItem.id) &&
        !validatePayableDuplicate(claimPayableItem, claimPayableListMap)
      ) {
        const mappingPolicy = getMappingPolicy(claimPayableItem, listPolicy);

        const result = complementClaimPayableItem(
          claimPayableItem,
          draftState.claimEntities,
          get(mappingPolicy, 'sumAssured')
        );
        draftState.claimEntities = result.editClaimEntities;
        draftState.claimEntities.claimPayableListMap[claimPayableItem.id] =
          result.editClaimPayableListItem;
      }
    });
  });

  return { ...nextState };
};

export default complementClaimPayableCallback;
