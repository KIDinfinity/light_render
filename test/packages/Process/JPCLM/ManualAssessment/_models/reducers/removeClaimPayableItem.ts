import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import { deteteDataByIncidentPayableId } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';
import { updateDuplicatePayableError } from '../functions';

const removeClaimPayableItem = (state: any, action: any) => {
  const { claimProcessData } = state;
  const { incidentPayableId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const editPayable = formUtils.cleanValidateData(
      draftState.claimEntities.claimPayableListMap[incidentPayableId]
    );

    updateDuplicatePayableError(
      draftState,
      {
        editPayable,
      },
      'claimPayable'
    );

    const result = deteteDataByIncidentPayableId(
      claimProcessData,
      draftState.claimEntities,
      incidentPayableId,
      wholeEntities
    );
    draftState.claimProcessData = result.claimProcessData;
    draftState.claimEntities = result.claimEntities;

  });
  return { ...nextState };
};

export default removeClaimPayableItem;
