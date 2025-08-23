import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';

import { isPreArrangement } from 'claim/pages/Thailand/flowConfig';

export default ({ NAMESPACE }: any) => {
  const caseCategory =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimProcessData?.caseCategory
    ) || '';
  const invoiceListMap =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities?.invoiceListMap
    ) || {};

  return useMemo(() => {
    return isPreArrangement(caseCategory) && lodash.isEmpty(invoiceListMap);
  }, [caseCategory, invoiceListMap]);
};
