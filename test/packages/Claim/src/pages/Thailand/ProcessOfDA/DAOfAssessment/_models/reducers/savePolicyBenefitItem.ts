import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const clearListMapSelection = (draftState, listMapKey, clearItem) => {
  const listMap = draftState.claimEntities[listMapKey];

  if(!listMap)
    return;

  const newListMap = Object.keys(listMap).reduce((newMap, key) => {
    const item = listMap[key];
    newMap[key] = clearItem(item)
    return newMap
  }, {})

  draftState.claimEntities[listMapKey] = newListMap
}

const savePolicyBenefitItem = (state: any, action: any) => {
  const { changedFields, policyBenefitId } = action.payload;

  let temp = lodash.get(state, `claimEntities.policyBenefitListMap[${policyBenefitId}]`);

  const nextState = produce(state, (draftState: any) => {
    temp = {
      ...temp,
      ...changedFields,
    };
    draftState.claimEntities.policyBenefitListMap[policyBenefitId] = temp;
    if(Object.keys(changedFields).length === 1 && lodash.has(changedFields, 'payTo')) {
      clearListMapSelection(draftState, 'payeeListMap', item => ({
        ...item,
        select: 0
      }));
      clearListMapSelection(draftState, 'policyOwnerBOListMap', item => ({
        ...item,
        claimBankAccounts: item.claimBankAccounts?.map(bankAccount => ({
          ...bankAccount,
          select: 0,
          defaultBankAccount: null,
        }))
      }));
      clearListMapSelection(draftState, 'policyPayorBOListMap', item => ({
        ...item,
        claimBankAccounts: item.claimBankAccounts?.map(bankAccount => ({
          ...bankAccount,
          select: 0,
          defaultBankAccount: null,
        }))
      }));

      let bankAccounts;
      switch(formUtils.queryValue(changedFields.payTo)) {
        case 'NP':
          bankAccounts = draftState.claimProcessData.payeeList?.map(payeeId => draftState.claimEntities.payeeListMap?.[payeeId])
          break;
        case 'PP':
          bankAccounts = draftState.claimProcessData.policyPayorBOList?.map(payorId => draftState.claimEntities.policyPayorBOListMap?.[payorId]?.claimBankAccounts || [])?.flat()
          break;
        case 'PO':
          bankAccounts = draftState.claimProcessData.policyOwnerBOList?.map(ownerId => draftState.claimEntities.policyOwnerBOListMap?.[ownerId]?.claimBankAccounts || [])?.flat()
          break;
      }
      if(bankAccounts?.length === 1) {
        bankAccounts[0].select = 1;
        if(formUtils.queryValue(changedFields.payTo) !== 'NP') {
          bankAccounts[0].defaultBankAccount = 1;
        }
      }
    }
  });

  return { ...nextState };
};

export default savePolicyBenefitItem;
