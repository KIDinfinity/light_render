import React from 'react';
import { isEmpty } from 'lodash';
import { tenant } from '@/components/Tenant';
import styles from '../index.less';

interface PrefixProps {
  currencyConfig: any;
  currencyCode?: string;
  defaultCode?: any;
  hiddenPrefix: any;
}

export default ({ currencyConfig, currencyCode, defaultCode, hiddenPrefix }: PrefixProps) => {
  const code = currencyCode || defaultCode;
  return (
    <>
      {!isEmpty(currencyConfig) && !isEmpty(code) && !hiddenPrefix && (
        <div className={styles.prefix}>{tenant.getCurrencySymbol(code)}</div>
      )}
    </>
  );
};
