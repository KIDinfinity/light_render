import { produce }  from 'immer';
import lodash from 'lodash';
import BankSource from 'process/NB/Enum/BankSource';
import { v4 as uuid }  from 'uuid';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const bankInfoQuery = lodash.get(action, 'payload.bankInfoQuery', {});
  const bankCode = formUtils.queryValue(bankInfoQuery?.bankCode);
  const extraChangeFields = (() => {
    const factoringItem = lodash
      .chain(state)
      .get('factoringHouseList')
      .find((item: any) => item.bankCode === bankCode)
      .pick(['factoringHouseCode', 'bankName'])
      .value();
    return {
      bankName: factoringItem?.bankName || '',
      bankAcctFactoryHouse: factoringItem?.factoringHouseCode || '',
    };
  })();
  const nextState = produce(state, (draftState: any) => {
    const bankInfoList = lodash.get(draftState, 'businessData.policyList[0].bankInfoList', []);
    let newBankList = [];
    if (bankInfoList[0].isNew) {
      newBankList = [...bankInfoList];
      newBankList[0] = {
        applicationNo: lodash.get(draftState, 'businessData.applicationNo', ''),
        policyId: lodash.get(draftState, 'businessData.policyId', ''),
        bankAcctNo: '',
        bankCode: '',
        bankAcctName: '',
        type: 'E',
        isNew: true,
        source: BankSource.OWB,
        id: uuid(),
        ...bankInfoQuery,
        ...extraChangeFields,
      };
    } else {
      newBankList = [
        {
          applicationNo: lodash.get(draftState, 'businessData.applicationNo', ''),
          policyId: lodash.get(draftState, 'businessData.policyId', ''),
          bankAcctNo: '',
          bankCode: '',
          bankAcctName: '',
          type: 'E',
          isNew: true,
          source: BankSource.OWB,
          id: uuid(),
          ...bankInfoQuery,
          ...extraChangeFields,
        },
        ...bankInfoList,
      ];
    }

    lodash.set(draftState, 'businessData.policyList[0].bankInfoList', newBankList);
  });
  return { ...nextState };
};
