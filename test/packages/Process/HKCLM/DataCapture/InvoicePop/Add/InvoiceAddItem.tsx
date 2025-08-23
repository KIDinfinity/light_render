import React from 'react';
import lodash from 'lodash';
import styles from '../style.less';
import InvoiceAddTitle from './InvoiceAddTitle';
import InvoiceAddBasic from './InvoiceAddBasic';

const InvoiceAddItem = ({ invoiceAddItem, incidentId }: any) => {
  const {
    invoiceNo,
    invoiceDate,
    expense,
    isClaimWithOtherInsurer,
    otherInsurerPaidAmount,
    serviceItemList,
    serviceAddItem,
    treatmentNo,
    id,
    invoiceCurrency,
  } = lodash.pick(invoiceAddItem, [
    'invoiceNo',
    'invoiceDate',
    'expense',
    'isClaimWithOtherInsurer',
    'otherInsurerPaidAmount',
    'serviceItemList',
    'serviceAddItem',
    'treatmentNo',
    'id',
    'invoiceCurrency',
  ]);
  const invoiceTitle = { treatmentNo, invoiceNo };
  const invoiceBasicItem = {
    invoiceDate,
    expense,
    isClaimWithOtherInsurer,
    otherInsurerPaidAmount,
    invoiceCurrency,
  };
  return (
    <div className={styles.invoiceListItem} style={{ marginBottom: 0 }}>
      <InvoiceAddTitle invoiceTitle={invoiceTitle} invoiceId={id} />
      <InvoiceAddBasic
        invoiceBasicItem={invoiceBasicItem}
        invoiceId={id}
        serviceItemList={serviceItemList}
        serviceAddItem={serviceAddItem}
        incidentId={incidentId}
      />
    </div>
  );
};

export default InvoiceAddItem;
