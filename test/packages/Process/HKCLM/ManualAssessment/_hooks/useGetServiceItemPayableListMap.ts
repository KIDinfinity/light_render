import { useMemo } from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/HKCLM/ManualAssessment/activity.config';
import lodash from 'lodash';

export default () => {
  const serviceItemPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap
  );

  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );

  return useMemo(() => {
    if (serviceItemPayableListMap) {
      return lodash.mapValues(serviceItemPayableListMap, (item) => ({
        ...item,
        benefitCategory:
          item.benefitCategory ??
          claimEntities?.claimPayableListMap?.[item?.payableId]?.benefitCategory,
        isStandaloneBooster:
          item.isStandaloneBooster ??
          claimEntities?.claimPayableListMap?.[item?.payableId]?.isStandaloneBooster,
      }));
    } else {
      return {};
    }
  }, [serviceItemPayableListMap, claimEntities]);
};
