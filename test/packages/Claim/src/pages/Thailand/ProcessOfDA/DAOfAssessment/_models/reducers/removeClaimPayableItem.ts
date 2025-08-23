import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ClaimDecision } from '../dto';
import Ienum from 'claim/enum';

import { deteteDataByIncidentPayableId } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';

const removeClaimPayableItem = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { claimEntities, claimProcessData } = draftState;
    const { incidentPayableId } = action.payload;

    const result = deteteDataByIncidentPayableId(
      claimProcessData,
      claimEntities,
      incidentPayableId,
      wholeEntities
    );
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData = result.claimProcessData;
    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities = result.claimEntities;

    const changeClaimPayable = lodash.get(
      draftState,
      `claimProcessData.hasChangeSection.claimPayableListMap.${incidentPayableId}`
    );

    lodash.set(
      draftState,
      `claimProcessData.hasChangeSection.claimPayableListMap.${incidentPayableId}`,
      { ...changeClaimPayable, operation: Ienum.Operation.D }
    );

    const existApprove = lodash.some(
      draftState.claimEntities.claimPayableListMap,
      (payableItem: any) =>
        formUtils.queryValue(payableItem.claimDecision) === ClaimDecision.approve
    );
    const decision = existApprove ? ClaimDecision.approve : ClaimDecision.deny;
    draftState.claimProcessData.claimDecision = {
      ...draftState.claimProcessData.claimDecision,
      assessmentDecision: decision,
    };
  });
  return { ...nextState };
};

export default removeClaimPayableItem;
