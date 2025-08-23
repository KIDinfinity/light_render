import React from 'react';
import classnames from 'classnames';
import Ellipsis from '@/components/Ellipsis';
import styles from './index.less';

interface ItemProps {
  active: boolean;
  onClick: () => void;
  title: string;
}
export default ({ active, onClick, title }: ItemProps) => {
  return (
    <div
      className={classnames(styles.button, {
        [styles.active]: active,
      })}
      onClick={onClick}
    >
      <span
        style={{
          width: '70%',
        }}
      >
        <Ellipsis lines={3} tooltip forceTooltip>
          {title}
        </Ellipsis>
      </span>
    </div>
  );
};
