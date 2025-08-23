import lodash, { has, forEach, isFunction, keys } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { setClaimant, resetClaimant } from './utils';
import { getPolicyOwnerInfo } from '../../functions/getPolicyOwnerInfo';
import { getClientInfoByPolicyId, getBeneficiary } from '../../functions';

const fieldFun = {
  relationshipWithInsured: ({ state, draftState, changedFields }: any) => {
    if (!has(changedFields, 'relationshipWithInsured')) return;

    if (keys(changedFields).length === 1) {
      if (changedFields.relationshipWithInsured.value === 'Self') {
        const keysInsured = [
          'firstName',
          'middleName',
          'surname',
          'extName',
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
        draftState.claimProcessData.claimant = {
          ...draftState.claimProcessData.claimant,
          ...lodash.pick(draftState.claimProcessData.insured, keysInsured),
        };
      } else if (changedFields.relationshipWithInsured.value === 'PolicyOwner') {
        const policyOwnerList = lodash.get(draftState, `claimProcessData.policyOwnerList`, []);
        const clientInfoList = lodash.get(draftState, `claimProcessData.clientInfoList`, []);
        const policyId = formUtils.queryValue(draftState.claimProcessData.insured.policyId);
        const policyClientInfo = getClientInfoByPolicyId({
          policyOwnerList,
          clientInfoList,
          policyId,
        });
        const policyOwnerInfo = getPolicyOwnerInfo(policyClientInfo);
        draftState.claimProcessData.claimant = {
          ...draftState.claimProcessData.claimant,
          ...policyOwnerInfo,
          ...changedFields,
        };
      } else if (changedFields.relationshipWithInsured.value === 'Others') {
        draftState.claimProcessData.claimant = {
          ...draftState.claimProcessData.claimant,
          firstName: null,
          surname: null,
          extName: null,
          middleName: null,
          gender: null,
          identityType: null,
          identityNo: null,
          nationality: null,
          dateOfBirth: null,
          occupation: null,
          phoneNo: null,
          email: null,
          address: null,
        };
      } else if (changedFields.relationshipWithInsured.value === 'Beneficiary') {
        const policyBeneficiaryList = lodash.get(
          draftState,
          `claimProcessData.policyBeneficiaryList`,
          []
        );
        const clientInfoList = lodash.get(draftState, `claimProcessData.clientInfoList`, []);
        const policyId = formUtils.queryValue(draftState.claimProcessData.insured.policyId);
        const policyClientInfo = getBeneficiary({
          policyBeneficiaryList,
          clientInfoList,
          policyId,
        });
        const policyOwnerInfo = getPolicyOwnerInfo(policyClientInfo);
        draftState.claimProcessData.claimant = {
          ...draftState.claimProcessData.claimant,
          ...policyOwnerInfo,
          ...changedFields,
        };
      }
    }
  },
  clientId: ({ state, draftState, changedFields }: any) => {
    if (!has(changedFields, 'clientId')) return;

    if (keys(changedFields).length === 1) {
      const clientInfoList = lodash.get(draftState, `claimProcessData.clientInfoList`, []);

      const policyClientInfo = lodash.find(
        clientInfoList,
        (item) => item.clientId === formUtils.queryValue(changedFields.clientId)
      );
      const policyOwnerInfo = getPolicyOwnerInfo(policyClientInfo);
      draftState.claimProcessData.claimant = {
        ...draftState.claimProcessData.claimant,
        ...policyOwnerInfo,
        ...changedFields,
      };
    }
  },
  claimant: ({ draftState, changedFields }: any) => {
    if (has(changedFields, 'claimant')) {
      if (changedFields.claimant.value === '02') {
        setClaimant(draftState);
      } else {
        resetClaimant(draftState);
      }
    }
  },
};

export default ({ state, draftState, changedFields, config }: any) => {
  const params = { state, draftState, changedFields };
  forEach(config, (item, key) => {
    switch (true) {
      case isFunction(item):
        item(params);
        break;
      case isFunction(fieldFun[key]):
        fieldFun[key](params);
        break;
      default:
        break;
    }
  });
};
