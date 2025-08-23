import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';
import PremiumProcessType from 'process/NB/PremiumSettlement/Enum/premiumProcessType';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const initCollectionStatus = lodash.get(businessData, 'policyList[0].collectionStatus', '');
  const initCreateReceiptStatus = lodash.get(businessData, 'policyList[0].createReceiptStatus', '');
  const initPremiumMatch = lodash.get(businessData, 'policyList[0].premiumMatch', '');
  return useMemo(() => {
    let index: number;
    if (
      [PremiumProcessType.InProgress, PremiumProcessType.IntegrationFailed].includes(
        initCollectionStatus
      )
    ) {
      index = 0;
    }
    if (
      [PremiumProcessType.InProgress, PremiumProcessType.IntegrationFailed].includes(
        initCreateReceiptStatus
      )
    ) {
      index = 1;
    }
    if (
      (![PremiumProcessType.InProgress, PremiumProcessType.IntegrationFailed].includes(
        initCollectionStatus
      ) &&
        ![PremiumProcessType.InProgress, PremiumProcessType.IntegrationFailed].includes(
          initCreateReceiptStatus
        ) &&
        initPremiumMatch === PremiumProcessType.InProgress) ||
      initPremiumMatch === PremiumProcessType.IntegrationFailed
    ) {
      index = 2;
    }
    if (initPremiumMatch === PremiumProcessType.Completed) {
      index = 3;
    }
    return index;
  }, [initCollectionStatus, initCreateReceiptStatus, initPremiumMatch]);
};
