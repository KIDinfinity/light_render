import { produce } from 'immer';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { JPINCIDENTITEM } from '@/utils/claimConstant';

const saveJpIncidentItem = (state: any, action: any) => {
  const { changedFields, incidentId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.has(changedFields, 'sequelaeOfStroke')) {
      if (changedFields.sequelaeOfStroke.value === '02') {
        changedFields.sequelaeNameOfStroke = '';
      }
    }

    const jpIncident = draftState.claimEntities.incidentListMap[incidentId].jpIncident || {
      ...JPINCIDENTITEM,
      id: uuidv4(),
      incidentId,
    };
    draftState.claimEntities.incidentListMap[incidentId].jpIncident = {
      ...jpIncident,
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveJpIncidentItem;
