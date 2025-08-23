import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { tenant, Region } from '@/components/Tenant';
import PremiumAction from 'process/NB/PremiumSettlement/Enum/PremiumAction';

export default () => {
  const premiumPaymentCfgList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.processData.premiumPaymentCfgList,
    shallowEqual
  );
  const defaultRefundPayType = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.processData.planInfoData?.defaultRefundPayType,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(premiumPaymentCfgList)
      .filter((item) => item.premiumAction === PremiumAction.PremiumRefund)
      .map((item) => {
        return {
          dictCode: item.paymentCode,
          dictName: item.paymentMethod,
        };
      })
      .filter(
        (item) =>
          !(
            tenant.region() === Region.TH &&
            defaultRefundPayType !== 'CCD' &&
            item.dictCode === 'CCD'
          )
      )
      .value();
  }, [premiumPaymentCfgList, defaultRefundPayType]);
};
