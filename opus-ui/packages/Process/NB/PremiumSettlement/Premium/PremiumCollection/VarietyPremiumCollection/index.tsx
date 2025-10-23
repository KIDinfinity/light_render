import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useHandleGetReceivableAmount from 'process/NB/PremiumSettlement/_hooks/useHandleGetReceivableAmount';
import useHandleGetReceivedAmount from 'process/NB/PremiumSettlement/_hooks/useHandleGetReceivedAmount';
import useGetPremiumBreakdownBOList from 'process/NB/PremiumSettlement/_hooks/useGetPremiumBreakdownBOList';
import LoadingPremium from './LoadingPremium';
import PremiumTemplate from './PremiumTemplate';

const VarietyPremiumCollectionProcess = () => {
  const premiumBreakdownList = useGetPremiumBreakdownBOList();
  const handleGetReceivableAmount = useHandleGetReceivableAmount();
  const handleGetReceivedAmount = useHandleGetReceivedAmount();

  return (
    <>
      {lodash.map(premiumBreakdownList, (item: any) => {
        const receivableAmount = handleGetReceivableAmount({
          paymentAmt: item?.paymentAmt,
          loadingPremium: item?.loadingPremium,
        });
        const receivedAmount = handleGetReceivedAmount({
          receiptAmt: item?.receiptAmt,
          paymentAmt: item?.paymentAmt,
          loadingPremium: item?.loadingPremium,
        });
        if (item?.paymentAmt !== 0) {
          return (
            <PremiumTemplate
              title={formatMessageApi({
                Dropdown_POL_PremiumType: item?.typeCodePayment,
              })}
              receivableAmount={receivableAmount}
              receivedAmount={receivedAmount}
              key={item?.id}
            />
          );
        }
      })}
      <LoadingPremium premiumBreakdownList={premiumBreakdownList} />
    </>
  );
};

export default VarietyPremiumCollectionProcess;
