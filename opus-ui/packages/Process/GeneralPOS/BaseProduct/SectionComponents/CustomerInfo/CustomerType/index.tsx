import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import classNames from 'classnames';

interface IProps {
  customerType: string;
  className?: string;
}

const CustomerType = ({ customerType, className }: IProps) => {
  return (
    <div className={classNames(styles.customerType, className)}>
      <span className={styles.value}>
        {formatMessageApi({
          Label_BPM_CaseInfo: customerType,
        })}
      </span>
    </div>
  );
};
export default CustomerType;
