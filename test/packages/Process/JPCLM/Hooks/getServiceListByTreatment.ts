import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
export default ({ treatmentId, NAMESPACE }: any) => {
  const invoiceList = useSelector(
    (state: any) => state?.[NAMESPACE]?.claimEntities?.treatmentListMap?.[treatmentId]?.invoiceList
  );
  const serviceItemListMap = useSelector(
    (state: any) => state?.[NAMESPACE]?.claimEntities?.serviceItemListMap
  );

  return useMemo(() => {
    return (
      lodash
        .chain(lodash.values(serviceItemListMap))
        .filter((el) => {
          return lodash.includes(invoiceList, el.invoiceId);
        })
        .value() || []
    );
  }, [treatmentId, serviceItemListMap]);
};
