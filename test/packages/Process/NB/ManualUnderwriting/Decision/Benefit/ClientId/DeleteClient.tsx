import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import useHandleRemoveClientFromCoverageCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleRemoveClientFromCoverageCallback';

export default ({ coverage, insured }) => {
  const handleRemove = useHandleRemoveClientFromCoverageCallback({
    coverageId: coverage.id,
    insuredId: insured?.id,
  });
  return (
    <div className={classnames(styles.icon, styles.clientName)} onClick={handleRemove}>
      <Icon type="close" />
    </div>
  );
};
