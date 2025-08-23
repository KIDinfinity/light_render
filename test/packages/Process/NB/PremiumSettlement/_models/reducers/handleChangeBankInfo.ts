import { produce }  from 'immer';
import lodash from 'lodash';
import { v4 as uuid }  from 'uuid';
import { formUtils } from 'basic/components/Form';
import PayType from 'process/NB/PremiumSettlement/Enum/payType';
import BankInfoType from 'process/NB/Enum/BankInfoType';
import BankSource from 'process/NB/Enum/BankSource';

export default (state: any, action: any) => {
  const { changedFields, id } = lodash.pick(action?.payload, ['changedFields', 'id']);

  const nextState = produce(state, (draftState: any) => {
    const refundPayType = lodash.get(draftState, 'businessData.policyList[0].refundPayType');
    const bankInfoList = lodash.get(draftState, 'businessData.policyList[0].bankInfoList', []);

    const extraChangeFields = (() => {
      if (lodash.size(changedFields) === 1) {
        if (lodash.has(changedFields, 'bankCode')) {
          const factoringItem = lodash
            .chain(draftState)
            .get('factoringHouseList')
            .find((item: any) => item.bankCode === formUtils.queryValue(changedFields?.bankCode))
            .pick(['factoringHouseCode', 'bankName'])
            .value();
          return {
            bankName: factoringItem?.bankName || '',
            bankAcctFactoryHouse: factoringItem?.factoringHouseCode || '',
          };
        }
        return {};
      }
    })();

    const targetBankInfo = lodash
      .chain(bankInfoList)
      .find((bankInfo) => bankInfo.id === id)
      .value();
    const targetBankInfoIndex = lodash
      .chain(bankInfoList)
      .findIndex((bankInfo) => bankInfo.id === id)
      .value();

    if (!lodash.isEmpty(targetBankInfo)) {
      const currentType = lodash.get(targetBankInfo, 'type');
      if (currentType !== BankInfoType.Withdrawal) {
        lodash.set(draftState, `businessData.policyList[0].bankInfoList`, [
          ...bankInfoList,
          {
            ...targetBankInfo,
            id: uuid(),
            type: BankInfoType.Withdrawal,
            ...changedFields,
            ...extraChangeFields,
          },
        ]);
      } else {
        lodash.set(draftState, `businessData.policyList[0].bankInfoList[${targetBankInfoIndex}]`, {
          ...targetBankInfo,
          ...changedFields,
          ...extraChangeFields,
          source: BankSource.OWB,
          selection: 'Y',
        });
      }
    } else {
      if (refundPayType === PayType.BankTransfer) {
        lodash.set(draftState, `businessData.policyList[0].bankInfoList`, [
          ...bankInfoList,
          {
            applicationNo: lodash.get(draftState, 'businessData.applicationNo', ''),
            policyId: lodash.get(draftState, 'businessData.policyId', ''),
            bankAcctFactoryHouse: '',
            bankAcctNo: '',
            bankCode: '',
            bankAcctName: '',
            bankName: '',
            id: uuid(),
            ...changedFields,
            type: BankInfoType.Withdrawal,
            ...extraChangeFields,
            source: BankSource.OWB,
            selection: 'Y',
          },
        ]);
      }
    }
  });
  return nextState;
};
