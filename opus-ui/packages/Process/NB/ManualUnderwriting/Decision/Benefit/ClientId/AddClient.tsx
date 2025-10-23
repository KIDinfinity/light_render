import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import useHandleAddClientToCoverage from 'process/NB/ManualUnderwriting/_hooks/useHandleAddClientToCoverage';

export default ({ item }: any) => {
  const handleAddClient = useHandleAddClientToCoverage({ coverageId: item?.id });

  return (
    <div className={classnames(styles.icon, styles.clientName)} onClick={() => handleAddClient()}>
      <Icon type="plus" />
    </div>
  );
};
