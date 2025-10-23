import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import Service from './Service';
import styles from './index.less';

const ServiceList = ({ treatmentId }: any) => {
  const invoiceListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.invoiceListMap
  );

  const { children } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.PopUpEditPayable?.data
  );

  const serviceList =
    lodash
      .chain(children)
      .filter({ treatmentId })
      .map((el: any) => {
        return {
          serviceItemId: el.serviceItemId,
          invoiceNo: invoiceListMap[el.invoiceId]?.invoiceNo,
        };
      })
      .value() || [];

  return (
    <div className={styles.serviceList}>
      {lodash.isArray(serviceList) &&
        serviceList.map((item, index: number) => (
          <div className={styles.serviceItem} key={item.serviceItemId}>
            <Service serviceId={item?.serviceItemId} invoiceNo={item?.invoiceNo} index={index} />
          </div>
        ))}
    </div>
  );
};

export default ServiceList;
