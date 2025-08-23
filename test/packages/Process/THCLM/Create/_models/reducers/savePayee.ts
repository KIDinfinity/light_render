import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';

const keysInsured = [
  'address',
  'clientId',
  'dateOfBirth',
  'email',
  'firstName',
  'gender',
  'identityNo',
  'identityType',
  'middleName',
  'phoneNo',
  'postCode',
  'surname',
];

const savePayee = (state: any, action: any) => {
  const { changedFields, payeeId } = action.payload;
  const payeeType = lodash.get(state, 'claimProcessData.payeeList[0].payeeType');
  const prePayeeType = formUtils.queryValue(payeeType);

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.payeeListMap[payeeId] = {
      ...draftState.claimEntities.payeeListMap[payeeId],
      ...changedFields,
    };
    if (lodash.size(changedFields) > 1) return;
    if (lodash.has(changedFields, 'payeeType')) {
      let payeeTemp = {
        ...draftState.claimEntities.payeeListMap[payeeId],
        ...changedFields,
      };
      switch (changedFields.payeeType.value) {
        case relationshipWithInsuredForHK.self:
          payeeTemp = {
            ...payeeTemp,
            ...lodash.pick(draftState.claimProcessData.insured, keysInsured),
            organization: 0,
          };
          break;
        case relationshipWithInsuredForHK.policyOwner:
          payeeTemp = {
            ...payeeTemp,
            ...lodash.pick(draftState.claimProcessData.claimant, keysInsured),
            organization: 0,
          };
          break;
        default:
          payeeTemp = {
            organization: 0,
            ...changedFields,
          };
          break;
      }
      draftState.claimEntities.payeeListMap[payeeId] = payeeTemp;
    }
    if (lodash.has(changedFields, 'paymentMethod')) {
      if (changedFields.paymentMethod.value === '02') {
        draftState.claimEntities.payeeListMap[payeeId] = {
          ...draftState.claimEntities.payeeListMap[payeeId],
          bankCode: undefined,
          bankAccountName: undefined,
          bankAccountNo: undefined,
        };
      } else if (changedFields.paymentMethod.value === '01') {
        // const name = `${formUtils.queryValue(
        //   payeeListMap.firstName
        // )} ${formUtils.queryValue(payeeListMap.surname)}`;
        // payeeListMap = {
        //   ...payeeListMap,
        //   bankAccountName: name,
        // };
      }
    }
    if (lodash.has(changedFields, 'identityType') && !changedFields.identityType.value) {
      draftState.claimEntities.payeeListMap[payeeId].identityNo = '';
    }
  });
  return { ...nextState };
};

export default savePayee;
