import React from 'react';
import useGetWithdrawTypeBankInfo from 'process/NB/PremiumSettlement/_hooks/useGetWithdrawTypeBankInfo';
import useGetBankInputType from 'process/NB/PremiumSettlement/_hooks/useGetBankInputType';
import BankInputType from 'process/NB/PremiumSettlement/Enum/BankInputType';
import BankInfoSelector from './BankSection/BankInfoSelector';
import BankInfoInput from './BankSection/BankInfoInput';
import useLoadFactoringHouseCallback from 'process/NB/PremiumSettlement/_hooks/useLoadFactoringHouseCallback';

export default () => {
  const withdrawBankInfo = useGetWithdrawTypeBankInfo();
  const inputType = useGetBankInputType();
  const handleLoadFactoringHouse = useLoadFactoringHouseCallback();
  React.useEffect(() => {
    handleLoadFactoringHouse({
      paymentMethod: 'BTR',
    });
  }, []);

  return (
    <>
      {inputType === BankInputType.Input && (
        <BankInfoInput data={withdrawBankInfo} id={withdrawBankInfo?.id} />
      )}
      {inputType === BankInputType.Selector && <BankInfoSelector />}
    </>
  );
};
