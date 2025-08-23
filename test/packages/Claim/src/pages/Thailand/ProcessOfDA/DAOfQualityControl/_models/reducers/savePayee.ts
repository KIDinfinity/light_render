import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterByKeys } from 'claim/pages/utils/fnObject';

const savePayee = (state: any, action: any) => {
  const { changedFields, payeeId } = action.payload;
  let temp = lodash.get(state, `claimEntities.payeeListMap[${payeeId}]`);
  const payeeType = lodash.get(temp, 'payeeType');
  const prePayeeType = formUtils.queryValue(payeeType);

  const nextState = produce(state, (draftState: any) => {
    temp = {
      ...temp,
      ...changedFields,
    };
    if (lodash.has(changedFields, 'payeeType')) {
      if (changedFields.payeeType.value === 'I') {
        const keysInsured = ['firstName', 'surname', 'identityType', 'identityNo', 'phoneNo'];
        temp = {
          ...temp,
          ...filterByKeys(draftState.claimProcessData.insured, keysInsured),
          relationshipWithInsured: 'SLF',
        };
      } else if (changedFields.payeeType.value !== 'I' && prePayeeType === 'I') {
        temp = {
          id: temp.id,
          organization: 0,
        };
      }
    }
    if (lodash.has(changedFields, 'paymentMethod')) {
      if (changedFields.paymentMethod.value === '02') {
        temp = {
          ...temp,
          bankCode: null,
          bankAccountName: null,
          bankAccountNo: null,
        };
      } else if (changedFields.paymentMethod.value === '01') {
        // draftState.claimProcessData.payee = {
        //   ...draftState.claimProcessData.payee,
        // };
      }
    }
    if (lodash.has(changedFields, 'identityType') && !changedFields.identityType.value) {
      temp.identityNo = '';
    }

    if (lodash.keys(changedFields).length === 1) {
      if (lodash.has(changedFields, 'bankCode')) {
        temp = {
          ...temp,
          bankCode: changedFields.bankCode,
          branchCode: '',
        };
      }
      if (lodash.has(changedFields, 'branchCode')) {
        temp = {
          ...temp,
          branchCode: changedFields.branchCode,
        };
      }
    }

    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities.payeeListMap[payeeId] = temp;
  });

  return { ...nextState };
};

export default savePayee;
