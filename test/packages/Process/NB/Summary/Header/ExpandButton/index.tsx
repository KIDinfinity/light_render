import React, { useState } from 'react';
import { Button, Icon } from 'antd';
import { ReactComponent as ExpandAll } from 'process/assets/expandAll.svg';
import { ReactComponent as CollapseAll } from 'process/assets/collapseAll.svg';
import useHandleToggleExpand from 'basic/components/ExpandableContainer/hooks/useHandleToggleExpand';
import styles from './index.less';

export default () => {
  const handleToggle = useHandleToggleExpand();
  const [expendStatus, setExpendStatus] = useState(false);
  const handleClick = () => {
    setExpendStatus(!expendStatus);
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      {!expendStatus ? (
        <Button onClick={handleToggle}>
          <Icon component={ExpandAll} className={styles.icon} />
          Expand All
        </Button>
      ) : (
        <Button onClick={handleToggle}>
          <Icon component={CollapseAll} className={styles.icon} />
          Collapse All
        </Button>
      )}
    </div>
  );
};
