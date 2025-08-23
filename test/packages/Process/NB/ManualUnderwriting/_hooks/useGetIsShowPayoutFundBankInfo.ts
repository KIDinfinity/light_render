import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useExistUsdpayoutidByCoreCode from 'process/NB/ManualUnderwriting/_hooks/useExistUsdpayoutidByCoreCode';
import { localConfig } from 'process/NB/ManualUnderwriting/PlanInfo/PaymentInfoDetail/PayoutFundBankInfo/Section';

export default () => {
  const existUsdpayoutidByCoreCode = useExistUsdpayoutidByCoreCode();
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  const isBankPayoutInd =
    lodash.get(planProductConfig, 'basicPlanProductFeatureList.0.bankPayoutInd') === 'Y';

  const PayoutFundBankInfoTableConfig = useGetSectionAtomConfig({
    section: 'PayoutFundBankInfo-Table',
    localConfig,
  });
  const isShowPayoutFundBankInfo = lodash.find(
    PayoutFundBankInfoTableConfig,
    (item) => item?.['field-props']?.visible === 'Y'
  );
  return useMemo(() => {
    return isShowPayoutFundBankInfo && (existUsdpayoutidByCoreCode || isBankPayoutInd);
  }, [isShowPayoutFundBankInfo, existUsdpayoutidByCoreCode, isBankPayoutInd]);
};
