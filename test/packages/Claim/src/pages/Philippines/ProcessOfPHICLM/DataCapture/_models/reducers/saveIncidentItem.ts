import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';

const saveIncidentItem = (state: any, action: any) => {
  const { changedFields, incidentId } = action.payload;

  if (lodash.keys(changedFields).length === 1 && lodash.has(changedFields, 'startOfdate')) {
    changedFields.dateTimeOfDeath.value = moment(
      formUtils.queryValue(changedFields.dateTimeOfDeath)
    )
      .startOf('date')
      .subtract(12, 'hours');
  }

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.incidentListMap[incidentId] = {
      ...state.claimEntities.incidentListMap[incidentId],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveIncidentItem;
