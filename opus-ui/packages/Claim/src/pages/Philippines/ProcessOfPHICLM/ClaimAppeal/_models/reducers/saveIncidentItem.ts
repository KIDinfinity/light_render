import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { shouldDo, countPolicyDuration, countContestableClaim } from '../functions/fnObject';

const saveIncidentItem = (state: any, action: any) => {
  const { changedFields, incidentId } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;

    if (lodash.keys(changedFields).length === 1 && lodash.has(changedFields, 'startOfdate')) {
      changedFields.dateTimeOfDeath.value = moment(
        formUtils.queryValue(changedFields.dateTimeOfDeath)
      )
        .startOf('date')
        .subtract(12, 'hours');
    }

    if (shouldDo(changedFields, 'incidentDate')) {
      const { listPolicy } = state;
      const incidentDate = lodash.get(
        draft,
        `claimEntities.incidentListMap.${incidentId}.incidentDate`
      );
      lodash.forEach(draft.claimEntities.claimPayableListMap, (item) => {
        const itemTemp = item;
        if (item.incidentId === incidentId) {
          const policyNo = lodash.get(item, 'policyNo');
          const policyItem = lodash.find(listPolicy, { policyNo });
          const issueEffectiveDate = lodash.get(policyItem, 'issueEffectiveDate');
          const { year, month } = countPolicyDuration(incidentDate, issueEffectiveDate);
          itemTemp.policyDurationYears = year;
          itemTemp.policyDurationMonths = month;
          itemTemp.contestableClaim = countContestableClaim(incidentDate, issueEffectiveDate);
        }
      });
    }

    draftState.claimEntities.incidentListMap[incidentId] = {
      ...state.claimEntities.incidentListMap[incidentId],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveIncidentItem;
