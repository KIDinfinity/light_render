import { produce }  from 'immer';
import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import { handleAssessDecision } from '../functions';

const updateAssessDecision = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { claimProcessData, claimEntities } = draftState;
    const claimPayableList = cleanFieldsMeta(claimEntities.claimPayableListMap);

    claimProcessData.claimDecision = {
      ...claimProcessData.claimDecision,
      assessmentDecision: handleAssessDecision(claimPayableList, claimProcessData.claimDecision),
    };
  });

  return { ...nextState };
};

export default updateAssessDecision;
