import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';

import { tenant, Region } from '@/components/Tenant';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import PremiumAction from 'opus/NewBusiness/ManualUnderwriting/_enum/PremiumAction';
import payType from 'opus/NewBusiness/PremiumSettlement/Enum/payType';

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
          !(tenant.region() === Region.TH && item.paymentCode === payType.CreditCard)
      )
      .map(({ paymentCode, paymentMethod }: any) => ({
        dictCode: paymentCode,
        dictName: paymentMethod,
      }))
      .value();
  }, [premiumPaymentCfgList, defaultRefundPayType]);
};
