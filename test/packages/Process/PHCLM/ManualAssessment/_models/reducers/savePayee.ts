import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { filterByKeys } from 'claim/pages/utils/fnObject';

const savePayee = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const payeeType = lodash.get(state, 'claimProcessData.payee.payeeType');
  const prePayeeType = formUtils.queryValue(payeeType);

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData.payee = {
      ...draftState.claimProcessData.payee,
      ...changedFields,
    };
    if (lodash.has(changedFields, 'payeeType')) {
      if (changedFields.payeeType.value === 'I') {
        const keysInsured = ['firstName', 'surname', 'identityType', 'identityNo', 'phoneNo'];
        draftState.claimProcessData.payee = {
          ...draftState.claimProcessData.payee,
          ...filterByKeys(draftState.claimProcessData.insured, keysInsured),
          relationshipWithInsured: relationshipWithInsuredForHK.self,
          organization: 0,
        };
      } else if (changedFields.payeeType.value !== 'I' && prePayeeType === 'I') {
        draftState.claimProcessData.payee = {
          organization: 0,
        };
      }
    }
    if (lodash.has(changedFields, 'paymentMethod')) {
      if (changedFields.paymentMethod.value === '02') {
        draftState.claimProcessData.payee = {
          ...draftState.claimProcessData.payee,
          bankCode: undefined,
          bankAccountName: undefined,
          bankAccountNo: undefined,
        };
      } else if (changedFields.paymentMethod.value === '01') {
        const name = `${formUtils.queryValue(
          draftState.claimProcessData.payee.firstName
        )} ${formUtils.queryValue(draftState.claimProcessData.payee.surname)}`;
        draftState.claimProcessData.payee = {
          ...draftState.claimProcessData.payee,
          bankAccountName: name,
        };
      }
    }
    if (lodash.has(changedFields, 'identityType') && !changedFields.identityType.value) {
      draftState.claimProcessData.payee.identityNo = '';
    }
  });

  return { ...nextState };
};

export default savePayee;
