import React, { useContext } from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import context from './Context';

import styles from './index.less';

export default ({ className }: any) => {
  const { parentHasHidden, parentExpand, setParentExpand, setActiveChild } = useContext(context);

  return (
    parentHasHidden && (
      <Icon
        className={classnames(styles.showHideButton, className)}
        type={parentExpand ? 'up' : 'down'}
        onClick={() => {
          setActiveChild([]);
          setParentExpand(!parentExpand);
        }}
      />
    )
  );
};
