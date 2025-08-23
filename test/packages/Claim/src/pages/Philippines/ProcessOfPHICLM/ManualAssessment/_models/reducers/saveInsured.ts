import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { InsuredState } from 'claim/enum/InsuredState';
import { assignByKeys } from 'claim/pages/utils/fnObject';

const saveInsured = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const preCurrentState = lodash.get(state, 'claimProcessData.insured.currentState');
  const preCurrentStateValue = formUtils.queryValue(preCurrentState);

  const relationshipWithInsured = lodash.get(
    state,
    'claimProcessData.claimant.relationshipWithInsured'
  );
  const relationshipWithInsuredValue = formUtils.queryValue(relationshipWithInsured);

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    draftState.claimProcessData.insured = {
      ...draftState.claimProcessData.insured,
      ...changedFields,
    };

    if (lodash.has(changedFields, 'currentState')) {
      lodash.map(draftState.claimProcessData.incidentList, (incidentId) => {
        const incidentItem = draftState.claimEntities.incidentListMap[incidentId];
        const claimTypeArray = formUtils.queryValue(incidentItem.claimTypeArray);
        const claimTypeValue = claimTypeArray.filter((value: string) => value !== 'DTH');
        draftState.claimEntities.incidentListMap[incidentId].claimTypeArray = claimTypeValue;

        return incidentId;
      });

      if (changedFields.currentState.value === InsuredState.deceased) {
        if (relationshipWithInsuredValue === 'SLF') {
          draftState.claimProcessData.claimant = {};
        }
      } else if (
        preCurrentStateValue === InsuredState.deceased &&
        changedFields.currentState.value !== InsuredState.deceased
      ) {
        lodash.forEach(draftState.claimProcessData.incidentList, (incidentId) => {
          draftState.claimEntities.incidentListMap[incidentId].dateTimeOfDeath = null;
        });
      }
    } else {
      const keysInsured: string[] = [
        'firstName',
        'surname',
        'identityType',
        'identityNo',
        'phoneNo',
        'gender',
        'nationality',
        'dateOfBirth',
        'occupation',
        'email',
        'address',
      ];

      if (relationshipWithInsuredValue === 'SLF') {
        draftState.claimProcessData.claimant = {
          ...draftState.claimProcessData.claimant,
          ...assignByKeys(
            draftState.claimProcessData.claimant,
            draftState.claimProcessData.insured,
            keysInsured
          ),
        };
      }
    }
  });

  return { ...nextState };
};

export default saveInsured;
