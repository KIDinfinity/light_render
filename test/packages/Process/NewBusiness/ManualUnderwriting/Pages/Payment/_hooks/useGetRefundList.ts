import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';

import { tenant, Region } from '@/components/Tenant';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import PremiumAction from 'process/NewBusiness/ManualUnderwriting/_enum/PremiumAction';

interface IParams {
  defaultRefundPayType: string;
}
export default ({ defaultRefundPayType = '' }: IParams) => {
  const premiumPaymentCfgList: any =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.premiumPaymentCfgList
    ) || [];

  return useMemo(() => {
    return lodash
      .chain(premiumPaymentCfgList)
      .filter(
        (item) =>
          item.premiumAction === PremiumAction.PremiumRefund &&
          !(tenant.region() === Region.TH && item.paymentCode === 'CCD')
      )
      .map(({ paymentCode, paymentMethod }: any) => ({
        dictCode: paymentCode,
        dictName: paymentMethod,
      }))
      .value();
  }, [premiumPaymentCfgList, defaultRefundPayType]);
};
