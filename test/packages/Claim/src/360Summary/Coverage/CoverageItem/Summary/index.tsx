import React from 'react';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { fnPrecisionFormat } from '@/utils/precisionUtils';
import styles from './index.less';

const format = (value: number) => {
  return fnPrecisionFormat((value || 0).toFixed(2), 2);
};

const Summary = ({ summary, role }: any) => {
  return (
    <div className={classnames(styles.itemGroup, styles.blue)}>
      <div className={styles.header}>
        <span className={styles.role}>
          {formatMessageApi({
            Dropdown_CLM_CustomerRole: role,
          })}
        </span>
        <span className={styles.label}>
          {formatMessageApi({
            Label_BIZ_Policy: 'TotalTASRAmount',
          })}
        </span>
        <span className={styles.amount}>{format(summary?.total)}</span>
      </div>
      <div className={styles.itemGroupList}>
        <div className={styles.item}>
          <span className={styles.name}>
            {formatMessageApi({
              Label_BIZ_Policy: 'TsarOfNew',
            })}
          </span>
          <span className={styles.amount}>{format(summary?.newTotalTsar)}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.name}>
            {formatMessageApi({
              Label_BIZ_Policy: 'TsarOfPending',
            })}
          </span>
          <span className={styles.amount}>{format(summary?.pendingTotalTsar)}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.name}>
            {formatMessageApi({
              Label_BIZ_Policy: 'TsarOfExisting',
            })}
          </span>
          <span className={styles.amount}>{format(summary?.existingTotalTsar)}</span>
        </div>
      </div>
    </div>
  );
};

Summary.displayName = 'Summary';

export default Summary;
