import React from 'react';
import { getFunctionName } from 'configuration/pages/NavigatorConfiguration/Utils';
import { connect } from 'dva';
import styles from './index.less';

const Header = ({ functionCode, functionName }: any) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <span className={styles.titleWord}>{getFunctionName(functionCode, functionName)}</span>
      </div>
    </div>
  );
};

export default connect(({ permissionConfigurationController }: any) => ({
  functionCode: permissionConfigurationController?.functionData?.functionCode,
  functionName: permissionConfigurationController?.functionData?.functionName,
}))(Header);
