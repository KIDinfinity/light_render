import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import styles from '../style.less';
import ServiceItem from './ServiceItem';
import ServiceAddItem from './ServiceAddItem';
import { SectionColumns } from '../Section';

const ServiceItemList = ({ invoiceId, serviceItemList, serviceAddItem, incidentId }: any) => {
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <>
      <div className={styles.serviceItemList}>
        <SectionColumns />
        {lodash.map(serviceItemList, (serviceItem: any) => (
          <ServiceItem
            key={serviceItem?.id}
            serviceItem={serviceItem}
            invoiceId={invoiceId}
            serviceId={serviceItem?.id}
            incidentId={incidentId}
          />
        ))}
        {!taskNotEditable && !lodash.isEmpty(serviceAddItem) && (
          <ServiceAddItem
            serviceAddItem={serviceAddItem}
            invoiceId={invoiceId}
            incidentId={incidentId}
          />
        )}
      </div>
    </>
  );
};

export default ServiceItemList;
