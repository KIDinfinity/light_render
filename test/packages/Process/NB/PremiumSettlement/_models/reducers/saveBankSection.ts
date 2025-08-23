import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import PayType from 'process/NB/PremiumSettlement/Enum/payType';

export default (state: any, action: any) => {
  const { changedFields, id } = lodash.pick(action?.payload, ['changedFields', 'id']);
  const { factoringHouseList } = state;
  const nextState = produce(state, (draftState: any) => {
    const bankInfoList = lodash.get(draftState, 'businessData.policyList[0].bankInfoList', []);
    const bankInfoIndex = lodash.findIndex(bankInfoList, (bankItem: any) => bankItem.id === id);
    if (
      formUtils.queryValue(
        lodash.chain(draftState).get('businessData.policyList[0].refundPayType').cloneDeep().value()
      ) === PayType.BankTransfer &&
      lodash.isEmpty(bankInfoList)
    ) {
      lodash.set(draftState, 'businessData.policyList[0].bankInfoList', [
        {
          applicationNo: lodash.get(draftState, 'businessData.applicationNo', ''),
          policyId: lodash.get(draftState, 'businessData.policyId', ''),
          bankAcctFactoryHouse: '',
          bankAcctNo: '',
          bankCode: '',
          bankAcctName: '',
          bankName: '',
        },
      ]);
    }
    lodash.set(draftState, `businessData.policyList[0].bankInfoList[${bankInfoIndex}]`, {
      ...lodash.get(draftState, `businessData.policyList[0].bankInfoList[${bankInfoIndex}]`),
      ...changedFields,
    });

    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'bankCode')) {
        const bankCode = formUtils.queryValue(changedFields?.bankCode);
        const factoringInfo = lodash.find(factoringHouseList, ['bankCode', bankCode]);

        if (!lodash.isEmpty(factoringInfo)) {
          lodash.set(draftState, `businessData.policyList[0].bankInfoList[${bankInfoIndex}]`, {
            ...lodash.get(draftState, `businessData.policyList[0].bankInfoList[${bankInfoIndex}]`),
            bankAcctFactoryHouse: lodash.get(factoringInfo, 'factoringHouseCode', null),
            bankName: lodash.get(factoringInfo, 'bankName', null),
          });
        }
      }
    }
  });
  return { ...nextState };
};
