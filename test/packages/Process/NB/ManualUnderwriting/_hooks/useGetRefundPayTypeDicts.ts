import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import { tenant, Region } from '@/components/Tenant';
import PremiumAction from 'process/NB/PremiumSettlement/Enum/PremiumAction';
// import { IDictionary } from '@/dtos/dicts';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.businessData,
    shallowEqual
  );
  const defaultRefundPayType = lodash
    .chain(businessData)
    .get('policyList[0].defaultRefundPayType', '')
    .value();

  return useMemo(() => {
    return lodash
      .chain(businessData)
      .get('policyList[0].premiumPaymentCfgList', [])
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
  }, [businessData, defaultRefundPayType]);
};
