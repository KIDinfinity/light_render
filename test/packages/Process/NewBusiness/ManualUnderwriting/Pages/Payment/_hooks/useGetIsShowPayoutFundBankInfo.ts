import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetBranchRequiredConditions from './useGetBranchRequiredConditions';
import { localConfig } from '../_components/PayoutFund/Section';

// TODO:这里需要优化
export default () => {
  const existUsdpayoutidByCoreCode = useGetBranchRequiredConditions();
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

  // TODO:这个配置是否不用做也行？
  const isShowPayoutFundBankInfo = lodash.find(
    PayoutFundBankInfoTableConfig,
    (item) => item?.['field-props']?.visible === 'Y'
  );

  return useMemo(() => {
    return (
      isShowPayoutFundBankInfo &&
      (existUsdpayoutidByCoreCode || isBankPayoutInd)
    );
  }, [isShowPayoutFundBankInfo, existUsdpayoutidByCoreCode, isBankPayoutInd]);
};
