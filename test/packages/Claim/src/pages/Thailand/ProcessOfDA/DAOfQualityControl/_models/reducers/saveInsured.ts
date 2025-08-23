import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { assignByKeys, filterByKeys } from 'claim/pages/utils/fnObject';

const saveInsured = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const preCurrentState = lodash.get(state, 'claimProcessData.insured.currentState');
  const preCurrentStateValue = formUtils.queryValue(preCurrentState);

  const relationshipWithInsured = lodash.get(
    state,
    'claimProcessData.claimant.relationshipWithInsured'
  );
  const relationshipWithInsuredValue = formUtils.queryValue(relationshipWithInsured);

  const payeeType = lodash.get(state, 'claimProcessData.payee.payeeType');
  const payeeTypeValue = formUtils.queryValue(payeeType);

  const nextState = produce(state, (draftState: any) => {
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

      if (changedFields.currentState.value === 'D') {
        draftState.claimProcessData.payee = {
          payeeType: 'B',
          organization: 0,
        };
        if (relationshipWithInsuredValue === 'SLF') {
          draftState.claimProcessData.claimant = {};
        }
      } else if (preCurrentStateValue === 'D' && changedFields.currentState.value !== 'D') {
        draftState.claimProcessData.payee = {
          organization: 0,
        };
        draftState.claimProcessData.insured.dateTimeOfDeath = null;
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
      if (payeeTypeValue === 'I') {
        draftState.claimProcessData.payee = {
          ...draftState.claimProcessData.payee,
          ...filterByKeys(draftState.claimProcessData.insured, lodash.take(keysInsured, 5)),
          relationshipWithInsured: 'SLF',
        };
      }
    }
  });

  return { ...nextState };
};

export default saveInsured;
