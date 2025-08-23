import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';
import Actions from './components/Actions/index';
import UWMEDecision from './components/UWMEDecision';
import useGetPolicyDecision from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPolicyDecision';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ expendStatus, setExpendStatus, dispalyExpandButton }: any) => {
  const policyDecision = useGetPolicyDecision();
  const isShowUWMEDecision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.displayUWMELink,
    shallowEqual
  );
  return (
    <div className={styles.head}>
      <span className={styles.title}>UW Decision</span>
      {/* Todo VENUS-15756第一点，需要给个提示
      <Tooltip
        arrowPointAtCenter
        placement="top"
        overlayClassName={styles.myErrorTooltip}
        title={'test'}
      >
        <Icon className={styles.errorIcon} component={ErrorSvg} />
      </Tooltip> */}
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
