import { useMemo } from 'react';
import lodash from 'lodash';
import useGetBankInfoFieldDataReadOnly from 'process/NB/ManualUnderwriting/_hooks/useGetBankInfoFieldDataReadOnly';
import AccountHolderType from 'process/NB/Enum/AccountHolderType';

export default ({ config }: any) => {
  const renewalPaymentBankInfoTableData = useGetBankInfoFieldDataReadOnly({ type: 'R' });
  return useMemo(() => {
    const bankInfoConfigList = [
      'bankAcctName',
      'bankCode',
      'bankAcctFactoryHouse',
      'bankAcctNo',
      'bankName',
      'branchName',
      'businessBankCode',
      'relationshipWithLifeAssured',
      'bankAccountHolderType',
      'bankCity',
    ];
    let bankInfoList = lodash.filter(config, (item: any) =>
      lodash.chain(bankInfoConfigList).includes(item?.field).value()
    );
    const ExitList = [AccountHolderType.PO_NAME, AccountHolderType.LI_NAME];
    if (lodash.includes(ExitList, renewalPaymentBankInfoTableData.bankAccountHolderType)) {
      bankInfoList = lodash.filter(bankInfoList, (item) => {
        return item.field !== 'relationshipWithLifeAssured';
      });
    }
    return bankInfoList;
  }, [config, renewalPaymentBankInfoTableData.bankAccountHolderType]);
};
