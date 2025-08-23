import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from 'process/NB/ManualUnderwriting/PlanInfo/PaymentInfoDetail/WithdrawalPaymentInfo/Section';

export default () => {
  const WithdrawalPaymentInfoTableConfig = useGetSectionAtomConfig({
    section: 'WithdrawalPaymentInfo-Table',
    localConfig,
  });
  const isShowWithdrawalPaymentInfo = lodash.find(
    WithdrawalPaymentInfoTableConfig,
    (item) => item?.['field-props']?.visible === 'Y'
  );

  return useMemo(() => {
    return isShowWithdrawalPaymentInfo;
  }, [isShowWithdrawalPaymentInfo]);
};
