import classNames from 'classnames';
import { ReactComponent as down } from 'packages/Opus/Assets/icon-chevron-down.svg';
import { ReactComponent as right } from 'packages/Opus/Assets/icon-chevron-right.svg';
import { Icon } from 'packages/Opus/Components/Antd';
import React, { useState } from 'react';
import styles from './index.less';

export default ({
  headerTitle,
  headerIcon,
  headerOperations,
  content,
  className,
  collapsable,
}: any) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={classNames(styles.wrapper, { [className]: true })}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Icon component={headerIcon} />
          <div className={styles.text}>{headerTitle}</div>
        </div>
        <div className={styles.operations}>{headerOperations}</div>
        {collapsable && (
          <div className={styles.collapse} onClick={() => setCollapsed(!collapsed)}>
            <Icon component={collapsed ? right : down} />
          </div>
        )}
      </div>
      {(!collapsable || !collapsed) && <div className={styles.content}>{content}</div>}
    </div>
  );
};
