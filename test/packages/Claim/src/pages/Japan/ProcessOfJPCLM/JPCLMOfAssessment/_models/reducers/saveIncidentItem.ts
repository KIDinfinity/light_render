import { produce } from 'immer';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { JPINCIDENTITEM } from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';

const saveIncidentItem = (state: any, action: any) => {
  const { changedFields, incidentId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (lodash.has(changedFields, 'claimTypeArray')) {
      const jpIncident = draftState.claimEntities.incidentListMap[incidentId].jpIncident || {
        ...JPINCIDENTITEM,
        id: uuidv4(),
        incidentId,
      };
      changedFields.jpIncident = jpIncident;
      if (!lodash.get(changedFields, 'claimTypeArray.value', []).includes('WOP')) {
        changedFields.jpIncident.waivedReason = '';
      }
      if (!lodash.get(changedFields, 'claimTypeArray.value', []).includes('TPD')) {
        changedFields.jpIncident.highlyDisabilityCode = '';
        changedFields.jpIncident.disabilityName = '';
      }
      if (!lodash.get(changedFields, 'claimTypeArray.value', []).includes('08')) {
        changedFields.jpIncident.requiringNursingDate = '';
      }
      if (!lodash.get(changedFields, 'claimTypeArray.value', []).includes('DTH')) {
        changedFields.jpIncident.deathDate = null;
        changedFields.jpIncident.acauseOfDeath = '';
      }
    }

    if (lodash.has(changedFields, 'adjustCauseOfIncident')) {
      const adjustCauseOfIncidentValue = changedFields.adjustCauseOfIncident.value;
      if (adjustCauseOfIncidentValue) {
        changedFields.causeOfIncident = adjustCauseOfIncidentValue;
      } else {
        changedFields.causeOfIncident = formUtils.queryValue(
          state.claimEntities.incidentListMap[incidentId].systemCauseOfIncident
        );
      }
    }

    draftState.claimEntities.incidentListMap[incidentId] = {
      ...state.claimEntities.incidentListMap[incidentId],
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveIncidentItem;
