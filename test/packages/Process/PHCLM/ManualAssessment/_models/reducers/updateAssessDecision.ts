import { produce }  from 'immer';
import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import lodash from 'lodash';
import { handleAssessDecision } from '../functions';

const updateAssessDecision = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { claimProcessData, claimEntities } = draftState;
    const claimPayableList = cleanFieldsMeta(claimEntities.claimPayableListMap);
    const targetClaimPayableList = lodash.filter(
      claimPayableList,
      (item) => (item?.booster !== 'Y' || item?.isStandaloneBooster === 'Y') &&
      (!claimProcessData.appeal || item.isPayableAdjusted || item.isNewPayable)
    );

    claimProcessData.claimDecision = {
      ...claimProcessData.claimDecision,
      assessmentDecision: handleAssessDecision(
        targetClaimPayableList,
        claimProcessData.claimDecision
      ),
    };
  });

  return { ...nextState };
};

export default updateAssessDecision;
