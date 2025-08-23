import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { InsuredState } from 'claim/enum/InsuredState';
import { assignByKeys } from 'claim/pages/utils/fnObject';
import { calculateDate, getPolicyInfoByInsuredId } from '../functions';

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
    if (lodash.size(changedFields) > 1) return;
    if (lodash.isEmpty(draftState.claimProcessData.payeeList)) {
      draftState.claimProcessData.payeeList = [{}];
    }

    if (lodash.has(changedFields, 'currentState')) {
      if (changedFields.currentState.value === InsuredState.deceased) {
        if (relationshipWithInsuredValue === 'Self') {
          draftState.claimProcessData.claimant = {};
        }
      } else if (
        preCurrentStateValue === InsuredState.deceased &&
        changedFields.currentState.value !== InsuredState.deceased
      ) {
        lodash.map(draftState.claimProcessData.incidentList, (incidentId) => {
          const incidentItem = draftState.claimEntities.incidentListMap[incidentId];
          const claimTypeArray = formUtils.queryValue(incidentItem.claimTypeArray);
          const claimTypeValue = lodash.filter(claimTypeArray, (value: string) => value !== 'DTH');
          draftState.claimEntities.incidentListMap[incidentId].claimTypeArray = claimTypeValue;
          draftState.claimEntities.incidentListMap[incidentId].dateTimeOfDeath = null;
          return incidentId;
        });
      }
    } else {
      const keysInsured: string[] = [
        'firstName',
        'surname',
        'extName',
        'middleName',
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

      if (relationshipWithInsuredValue === 'Self') {
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
    if (lodash.has(changedFields, 'dateOfBirth')) {
      const birthValue = changedFields.dateOfBirth.value;
      const submissionDate = formUtils.queryValue(draftState.claimProcessData.submissionDate);
      const presentAge = calculateDate(submissionDate, birthValue);
      draftState.claimProcessData.insured.presentAge = presentAge;

      const { policyList } = draftState.claimProcessData;

      const insuredInfo = {
        policyId: draftState.claimProcessData.insured.policyId,
      };
      const policyInfoList = getPolicyInfoByInsuredId(policyList, insuredInfo);
      const effectiveDate = policyInfoList?.issueEffectiveDate;
      const issueAge = calculateDate(effectiveDate, birthValue);
      draftState.claimProcessData.insured.issueAge = issueAge;
    }
  });

  return { ...nextState };
};

export default saveInsured;
