import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetCustomerLevelDecision from 'process/NB/ManualUnderwriting/_hooks/useGetCustomerLevelDecision';
import styles from './index.less'
export default ({ item }: any) => {
  const customerDecision = useGetCustomerLevelDecision({ coverageItem: item });

  return (
    <>
      {lodash.map(customerDecision, (decision: any, index: number) => {
        return (
          <div key={index} className={styles.customerDecision}>{formatMessageApi({ Dropdown_UW_BenefitDecision: [decision] })}</div>
        );
      })}
    </>
  );
};
