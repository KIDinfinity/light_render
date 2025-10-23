import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useExpanderController from 'navigator/hooks/useExpanderController';
import styles from './index.less';
import classNames from 'classnames';

export default function Info({ item }: any) {
  const { isExpanderSwitchOn } = useExpanderController();
  const {
    mainProductCode,
    policyInsured,
    policyOwner,
    policyPayor,
    riskCommenceDate,
    riskCessationDate,
  } = item;

  return (
    <div className={styles.info}>
      <div className={styles.basic}>
        {formatMessageApi({ Dropdown_PRD_Product: mainProductCode })}
      </div>
      <div className={styles.basic}>{`${riskCommenceDate} ~ ${riskCessationDate}`}</div>
      <div className={classNames(styles.wrap, { [`${styles.wrapExpanded}`]: isExpanderSwitchOn })}>
        <div>
          <span className={styles.label}>
            {formatMessageApi({ Label_BIZ_Policy: 'PolicyOwner' })}
          </span>
          <span className={styles.basic}>{policyOwner}</span>
        </div>
        <div>
          <span className={styles.label}>
            {formatMessageApi({ Label_BIZ_Policy: 'PolicyInsured' })}
          </span>
          <span className={styles.basic}>{policyInsured}</span>
        </div>
        <div>
          <span className={styles.label}>
            {formatMessageApi({ Label_BIZ_Policy: 'PolicyPayor' })}
          </span>
          <span className={styles.basic}>{policyPayor}</span>
        </div>
      </div>
    </div>
  );
}
