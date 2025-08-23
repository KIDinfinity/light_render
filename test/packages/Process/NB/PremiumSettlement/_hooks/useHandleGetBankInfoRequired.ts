import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import PremiumType from 'process/NB/PremiumSettlement/Enum/premiumType';
import PayType from 'process/NB/PremiumSettlement/Enum/payType';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.businessData,
    shallowEqual
  );
  return useMemo(() => {
    const premiumType = lodash.get(businessData, 'premiumType');
    const payType = lodash.get(businessData, 'policyList[0].refundPayType');
    if (premiumType === PremiumType.PremiumRefund && payType === PayType.BankTransfer) {
      return true;
    }
    return false;
  }, [businessData]);
};
