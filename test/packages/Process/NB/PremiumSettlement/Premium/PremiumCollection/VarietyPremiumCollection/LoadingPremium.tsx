import React from 'react';
import useGetReceivableLoadingPremium from 'process/NB/PremiumSettlement/_hooks/useGetReceivableLoadingPremium';
import useGetReceivedLoadingPremium from 'process/NB/PremiumSettlement/_hooks/useGetReceivedLoadingPremium';
import PremiumTemplate from './PremiumTemplate';
import { getFieldDisplayAmount } from '@/utils/accuracy';

const LoadingPremium = ({ premiumBreakdownList }: any) => {
  const receivableLoadingPremium = useGetReceivableLoadingPremium({
    premiumBreakdownList,
  });
  const receivedLoadingPremium = useGetReceivedLoadingPremium({
    premiumBreakdownList,
  });
  return (
    <>
      {receivableLoadingPremium > 0 ? (
        <PremiumTemplate
          title="Loading Premium"
          receivableAmount={getFieldDisplayAmount(receivableLoadingPremium, '')}
          receivedAmount={getFieldDisplayAmount(receivedLoadingPremium, '')}
        />
      ) : null}
    </>
  );
};

export default LoadingPremium;
