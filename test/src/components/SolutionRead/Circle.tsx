import { Badge } from 'antd';
import React from 'react';
import { getReadedCount } from './Hooks';
import styles from './index.less';
import classnames from 'classnames';

interface IProps {
  module: string;
  inboundRight?: boolean;
  taskId?: string;
}

export default ({ module, inboundRight, taskId }: IProps) => {
  const { count, dot } = getReadedCount({ module, taskId });

  return (
    <>
      {count > 0 && (
        <div
          className={classnames({
            [styles.circle]: true,
            [styles.inboundRight]: inboundRight,
            [styles.dot]: dot,
          })}
        >
          <Badge count={count} dot={dot} />
        </div>
      )}
    </>
  );
};
