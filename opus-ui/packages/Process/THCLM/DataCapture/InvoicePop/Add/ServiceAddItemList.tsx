import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import styles from '../style.less';
import ServiceAddItem from './ServiceAddItem';
import { SectionColumns } from '../Section';
import InvoiceServiceAddItem from './InvoiceServiceAddItem';

const ServiceAddItemList = ({ invoiceId, serviceItemList, serviceAddItem }: any) => {
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <>
      <div className={styles.serviceItemList}>
        <SectionColumns />
        {lodash.map(serviceItemList, (serviceItem: any) => (
          <ServiceAddItem
            key={serviceItem?.id}
            serviceItem={serviceItem}
            invoiceId={invoiceId}
            serviceId={serviceItem?.id}
          />
        ))}
        {!taskNotEditable && !lodash.isEmpty(serviceAddItem) && (
          <InvoiceServiceAddItem serviceAddItem={serviceAddItem} invoiceId={invoiceId} />
        )}
      </div>
    </>
  );
};

export default ServiceAddItemList;
