import React from 'react';
import { useSelector } from 'dva';
import { TabsKey } from 'claim/pages/360/enum';
import CoverageBreakdown from './CoverageBreakdown';
import styles from './index.less';

const C360ExpanderModule = () => {
  const c360Tab = useSelector((state: any) => state.workspaceSwitchOn?.c360Tab);
  const Module = {
    [TabsKey.coverage]: <CoverageBreakdown />,
  };
  return Module[c360Tab] ?? <></>;
};

const C360Expander = () => {
  return (
    <div className={styles.C360Expander}>
      <C360ExpanderModule />
    </div>
  );
};

export default C360Expander;
