import React from 'react';
import lodash from 'lodash';
import styles from './style.less';
import InvoiceTitle from './InvoiceTitle';
import InvoiceBasic from './InvoiceBasic';

const InvoiceListItem = ({ invoiceId, invoiceItem }: any) => {
  const {
    treatmentNo,
    invoiceNo,
    invoiceDate,
    expense,
    isClaimWithOtherInsurer,
    otherInsurerPaidAmount,
    serviceItemList,
    serviceAddItem,
    invoiceCurrency,
  } = lodash.pick(invoiceItem, [
    'treatmentNo',
    'invoiceNo',
    'invoiceDate',
    'expense',
    'isClaimWithOtherInsurer',
    'otherInsurerPaidAmount',
    'serviceItemList',
    'serviceAddItem',
    'invoiceCurrency',
  ]);
  const invoiceTitle = { treatmentNo, invoiceNo: invoiceNo || '' };
  const invoiceBasicItem = {
    invoiceDate,
    expense,
    invoiceCurrency,
    isClaimWithOtherInsurer,
    otherInsurerPaidAmount,
  };

  return (
    <div className={styles.invoiceListItem} style={{ marginBottom: '50px' }}>
      <InvoiceTitle invoiceTitle={invoiceTitle} invoiceId={invoiceId} />
      <InvoiceBasic
        invoiceBasicItem={invoiceBasicItem}
        invoiceId={invoiceId}
        serviceItemList={serviceItemList}
        serviceAddItem={serviceAddItem}
      />
    </div>
  );
};

export default InvoiceListItem;
