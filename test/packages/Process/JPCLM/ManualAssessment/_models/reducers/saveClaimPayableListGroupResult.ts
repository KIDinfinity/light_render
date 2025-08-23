import { produce }  from 'immer';
import lodash from 'lodash';

const saveClaimPayableListGroupResult = (state: any, action: any) => {
  const { changedFields, claimPayableListMap, targets, incidentId } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;

    const payables = lodash.map(targets?.payableIds || [], (el: any) => el.id);


    if (!lodash.isEmpty(incidentId) && !lodash.isEmpty(targets?.policyNo)) {
      draftState.claimPayableGroupList[`${incidentId}.${targets?.policyNo}`] = {
        ...(draftState?.claimPayableGroupList[`${incidentId}.${targets?.policyNo}`] || {}),
        ...changedFields
      }
    }

    if ((lodash.has(changedFields, 'settlementDecision') || lodash.has(changedFields, 'detailedAssessmentDecision')) && lodash.size(changedFields) === 1) {
      const key = Object.keys(changedFields)[0]
      lodash.map(claimPayableListMap, (claimPayable, claimPayableId) => {
        if (lodash.includes(payables, claimPayableId)) {
          draftState.claimEntities.claimPayableListMap[claimPayableId] = {
            ...(draftState.claimEntities.claimPayableListMap[claimPayableId] || {}),
            [key]: changedFields[key].value,
          };
        }
      });

    }

    if (lodash.has(changedFields, 'settlementDecision') && lodash.size(changedFields) === 1) {
      lodash.map(claimPayableListMap, (claimPayable, claimPayableId) => {
        if (lodash.includes(payables, claimPayableId)) {
          draftState.claimEntities.claimPayableListMap[claimPayableId] = {
            ...(draftState.claimEntities.claimPayableListMap[claimPayableId] || {}),
            detailedAssessmentDecision: '',
          };
        }
      });
    }
  });
  return { ...nextState };
};

export default saveClaimPayableListGroupResult;
