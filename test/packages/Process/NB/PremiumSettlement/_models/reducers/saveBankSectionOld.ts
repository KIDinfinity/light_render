import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import PayType from 'process/NB/PremiumSettlement/Enum/payType';
import BankInfoType from 'process/NB/Enum/BankInfoType';

export default (state: any, action: any) => {
  const { changedFields, bankInfoIndex } = lodash.pick(action?.payload, [
    'changedFields',
    'bankInfoIndex',
  ]);
  const { brankList } = state;
  const nextState = produce(state, (draftState: any) => {
    const bankInfoList = lodash.get(draftState, 'businessData.policyList[0].bankInfoList', []);
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
      type:
        bankInfoIndex === bankInfoList.length
          ? BankInfoType.Withdrawal
          : lodash.get(
              draftState,
              `businessData.policyList[0].bankInfoList[${bankInfoIndex}].type`
            ),
    });

    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'bankCode')) {
        const bankInfo = lodash.find(brankList, [
          'bankCode',
          formUtils.queryValue(changedFields?.bankCode),
        ]);
        if (!lodash.isEmpty(bankInfo)) {
          lodash.set(draftState, `businessData.policyList[0].bankInfoList[${bankInfoIndex}]`, {
            ...lodash.get(draftState, `businessData.policyList[0].bankInfoList[${bankInfoIndex}]`),
            bankAcctFactoryHouse: lodash.get(bankInfo, 'factoringHouseCode', null),
            bankName: lodash.get(bankInfo, 'bankName', null),
            type:
              bankInfoIndex === bankInfoList.length
                ? BankInfoType.Withdrawal
                : lodash.get(
                    draftState,
                    `businessData.policyList[0].bankInfoList[${bankInfoIndex}].type`
                  ),
          });
        }
      }
      if (lodash.has(changedFields, 'bankAcctFactoryHouse')) {
        lodash.set(draftState, `businessData.policyList[0].bankInfoList[${bankInfoIndex}]`, {
          ...lodash.get(draftState, `businessData.policyList[0].bankInfoList[${bankInfoIndex}]`),
          bankCode: null,
          bankName: null,
          type:
            bankInfoIndex === bankInfoList.length
              ? BankInfoType.Withdrawal
              : lodash.get(
                  draftState,
                  `businessData.policyList[0].bankInfoList[${bankInfoIndex}].type`
                ),
        });
      }
    }
  });
  return { ...nextState };
};
