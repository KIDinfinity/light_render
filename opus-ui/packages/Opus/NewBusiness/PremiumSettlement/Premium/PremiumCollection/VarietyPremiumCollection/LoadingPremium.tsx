import React from 'react';
import useGetReceivableLoadingPremium from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetReceivableLoadingPremium';
import useGetReceivedLoadingPremium from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetReceivedLoadingPremium';
import PremiumTemplate from './PremiumTemplate';

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
          receivableAmount={receivableLoadingPremium}
          receivedAmount={receivedLoadingPremium}
        />
      ) : null}
    </>
  );
};

export default LoadingPremium;
