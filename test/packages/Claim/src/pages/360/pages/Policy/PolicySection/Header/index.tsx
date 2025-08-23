import React from 'react';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant } from '@/components/Tenant';
import useExpanderController from 'navigator/hooks/useExpanderController';
import { formatDate } from '../../../../_functions';
import styles from './index.less';

export default function Header({ item }: any) {
  const { isExpanderSwitchOn } = useExpanderController();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.policyNo}>{formatMessageApi({ Label_BIZ_Policy: 'PolicyNo' })}</div>
        {item?.policySource && (
          <span className={styles.individual}>
            {formatMessageApi({ PolicyType: item?.policySource })}
          </span>
        )}
        {item?.riskStatus && (
          <span className={styles.individual}>
            {formatMessageApi({ risk_status: item?.riskStatus })}
          </span>
        )}
      </div>
      <div className={styles.schema}>
        <div className={classNames(styles.detail, { [styles.expander]: isExpanderSwitchOn })}>
          <div className={styles.PolicyNoCode}>{item?.policyId}</div>
          {!!item?.internalPolicyId && (
            <div>{`(Internal Policy No.${item?.internalPolicyId})`}</div>
          )}
        </div>
        <div className={styles.insurancecompany}>
          {formatMessageApi({ Dropdown_PRD_Product: item?.mainProductCode })}
        </div>
        {!tenant.isJP() && item?.issueEffectiveDate && item?.riskCessationDate && (
          <div>{`${formatDate(item?.issueEffectiveDate)} ~ ${formatDate(
            item?.riskCessationDate
          )}`}</div>
        )}
        {tenant.isJP() && item?.riskCommenceDate && (
          <div>{`${formatDate(item?.riskCommenceDate)}`}</div>
        )}
      </div>
    </>
  );
}
