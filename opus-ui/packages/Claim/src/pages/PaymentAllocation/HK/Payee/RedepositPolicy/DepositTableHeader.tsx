import DataLayout from '@/components/DataLayout';
import DataWrap from '@/components/DataLayout/DataWrap';
import React from 'react';
import styles from './index.less';
const LABEL_LIST = [
  {
    code: 'redepositPolicyNo',
    label: 'Policy Number',
    span: 4,
  },
  {
    code: 'redepositPercentage',
    label: 'Redeposit Percentage',
    span: 4,
  },

  {
    code: 'redepositAmt',
    label: 'Redeposit Amount',
    span: 4,
  },
  {
    code: 'policyCurrency',
    label: 'Policy Currency',
    span: 4,
  },
  {
    code: 'exchangeRateRecord',
    label: 'Exchange Rate',
    span: 8,
  },
];
export default function DepositTableHeader() {
  return (
    <div className={styles.labelRowContent}>
      <DataLayout span={6}>
        {LABEL_LIST.map((item: { code: string; label: string; span: number }) => (
          <DataWrap className={styles.labelRowCell} key={item.code} span={item.span}>
            {item.label}
          </DataWrap>
        ))}
      </DataLayout>
    </div>
  );
}
