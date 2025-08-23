import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';

const saveLifePayable = (state: any, action: any) => {
  const { claimEntities } = state;
  const { changedFields, incidentPayableId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const incidentPayableItem = claimEntities.claimPayableListMap[incidentPayableId];

    let changeClaimPayable: any = {};

    if (lodash.size(changedFields) === 1) {
      if (
        lodash.has(changedFields, 'claimDecision') &&
        ClaimDecision.deny === formUtils.queryValue(changedFields?.claimDecision)
      ) {
        changeClaimPayable = {
          ...changeClaimPayable,
          systemCalculationAmount: 0,
          assessorOverrideAmount: null,
          payableAmount: 0,
          payableDays: null,
        };
      }
    }

    draftState.claimEntities.claimPayableListMap[incidentPayableId] = {
      ...incidentPayableItem,
      ...changedFields,
      ...changeClaimPayable,
      lifePayable: {
        ...incidentPayableItem.lifePayable,
        ...changedFields,
        ...changeClaimPayable,
      },
    };
  });

  return { ...nextState };
};

export default saveLifePayable;
