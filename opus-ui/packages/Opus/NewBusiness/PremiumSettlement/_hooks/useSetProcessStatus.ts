import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/PremiumSettlement/activity.config';
import PremiumProcessType from 'opus/NewBusiness/PremiumSettlement/Enum/premiumProcessType';
import ProcessStatusType from 'opus/NewBusiness/PremiumSettlement/Enum/processStatusType';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const initCollectionStatus = lodash.get(businessData, 'policyList[0].collectionStatus', '');
  const initCreateReceiptStatus = lodash.get(businessData, 'policyList[0].createReceiptStatus', '');
  const initPremiumMatch = lodash.get(businessData, 'policyList[0].premiumMatch', '');
  return useMemo(() => {
    if (
      [initCollectionStatus, initCreateReceiptStatus, initPremiumMatch].includes(
        PremiumProcessType.IntegrationFailed
      )
    ) {
      return ProcessStatusType.Error;
    }
    return ProcessStatusType.Process;
  }, [initCollectionStatus, initCreateReceiptStatus, initPremiumMatch]);
};
