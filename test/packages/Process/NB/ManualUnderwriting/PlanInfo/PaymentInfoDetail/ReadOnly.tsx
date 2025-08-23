import React from 'react';
import useGetIsShowWithdrawalPaymentInfo from 'process/NB/ManualUnderwriting/_hooks/useGetIsShowWithdrawalPaymentInfo';
import useGetIsShowPayoutFundBankInfo from 'process/NB/ManualUnderwriting/_hooks/useGetIsShowPayoutFundBankInfo';
import useGetShowDividendICPInfo from 'process/NB/ManualUnderwriting/_hooks/useGetShowDividendICPInfo';
import InitialPaymentAmount from './InitialPaymentAmount/ReadOnly';
import RenewalPaymentAmount from './RenewalPaymentAmount/ReadOnly';
import WithdrawalPaymentInfo from './WithdrawalPaymentInfo/ReadOnly';
import PayoutFundBankInfo from './PayoutFundBankInfo/ReadOnly';
import DividendICPInfo from './DividendICPInfo/ReadOnly';
import CharitableOrganization from './CharitableOrganization/ReadOnly';
import { tenant, Region } from '@/components/Tenant';

export default () => {
  const isShowWithdrawalPaymentInfo = useGetIsShowWithdrawalPaymentInfo();
  const isShowPayoutFundBankInfo = useGetIsShowPayoutFundBankInfo();
  const showDividendICPInfo = useGetShowDividendICPInfo();

  return (
    <div style={{ width: '100%', marginLeft: '50px', marginBottom: '40px' }}>
      <InitialPaymentAmount />
      <RenewalPaymentAmount />

      {isShowWithdrawalPaymentInfo && <WithdrawalPaymentInfo />}
      {isShowPayoutFundBankInfo && <PayoutFundBankInfo />}
      {showDividendICPInfo && <DividendICPInfo />}
      {tenant.region({
        [Region.MY]: () => (
          <div>
            <CharitableOrganization />
          </div>
        ),
      })}
    </div>
  );
};
