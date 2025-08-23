import { produce } from 'immer';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { PAYEEITEM } from '@/utils/claimConstant';
import { filterByKeys } from 'claim/pages/utils/fnObject';

const savePayee = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const payeeType = lodash.get(state, 'claimProcessData.payeeList[0].payeeType');
  const prePayeeType = formUtils.queryValue(payeeType);
  const id = uuidv4();
  const nextState = produce(state, (draftState) => {
    if (lodash.isEmpty(draftState.claimProcessData.payeeList)) {
      draftState.claimProcessData.payeeList = [id];
      draftState.claimEntities.payeeListMap[id] = {
        ...PAYEEITEM,
        claimNo: draftState.claimProcessData.claimNo,
        id,
      };
    }
    const payeeId: string = lodash.first(draftState.claimProcessData.payeeList) as string;
    let payeeTemp = {
      ...draftState.claimEntities.payeeListMap[payeeId],
      ...changedFields,
    };
    if (lodash.size(changedFields) > 1) {
      draftState.claimEntities.payeeListMap[payeeId] = payeeTemp;
      return;
    }
    if (lodash.has(changedFields, 'payeeType')) {
      if (changedFields.payeeType.value === 'I') {
        const keysInsured = ['firstName', 'surname', 'identityType', 'identityNo', 'phoneNo'];
        payeeTemp = {
          ...payeeTemp,
          ...filterByKeys(draftState.claimProcessData.insured, keysInsured),
          relationshipWithInsured: 'SLF',
          organization: 0,
        };
      } else if (changedFields.payeeType.value !== 'I' && prePayeeType === 'I') {
        payeeTemp = {
          organization: 0,
          ...changedFields,
        };
      }
    }
    if (lodash.has(changedFields, 'paymentMethod')) {
      if (changedFields.paymentMethod.value === '02') {
        payeeTemp = {
          ...payeeTemp,
          bankCode: undefined,
          bankAccountName: undefined,
          bankAccountNo: undefined,
        };
      } else if (changedFields.paymentMethod.value === '01') {
        const name = `${formUtils.queryValue(payeeTemp.firstName)} ${formUtils.queryValue(
          payeeTemp.surname
        )}`;
        payeeTemp = {
          ...payeeTemp,
          bankAccountName: name,
        };
      }
    }
    if (lodash.has(changedFields, 'identityType') && !changedFields.identityType.value) {
      payeeTemp.identityNo = '';
    }
    draftState.claimEntities.payeeListMap[payeeId] = payeeTemp;
  });

  return { ...nextState };
};

export default savePayee;
