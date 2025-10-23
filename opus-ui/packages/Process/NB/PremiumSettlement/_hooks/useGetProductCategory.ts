import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );
  return useMemo(() => {
    return lodash
      .chain(businessData)
      .get('policyList[0].coverageList')
      .find((coverageItem: any) => coverageItem.isMain === 'Y')
      .get('productCategory')
      .value();
  }, [businessData]);
};
