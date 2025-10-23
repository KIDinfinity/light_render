import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';
import Actions from './Actions';
import UWMEDecision from 'process/NB/ManualUnderwriting/Decision/UWMEDecision';
import useGetPolicyDecision from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyDecision';
import useGetUWMELinkRule from 'process/NB/ManualUnderwriting/_hooks/useGetUWMELinkRule';

export default ({ expendStatus, setExpendStatus, dispalyExpandButton }: any) => {
  const policyDecision = useGetPolicyDecision();
  const isShowUWMEDecision = useGetUWMELinkRule();
  return (
    <div className={styles.head}>
      <span className={styles.title}>UW Decision</span>
      {dispalyExpandButton && (
        <span className={styles.icon}>
          <Icon
            type={!expendStatus ? 'down' : 'up'}
            onClick={() => setExpendStatus(!expendStatus)}
          />
        </span>
      )}
      {isShowUWMEDecision && <UWMEDecision policyDecision={policyDecision} />}
      <Actions />
    </div>
  );
};
