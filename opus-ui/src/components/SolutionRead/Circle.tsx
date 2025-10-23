import { Badge } from 'antd';
import React from 'react';
import { getReadedCount } from './Hooks';
import styles from './index.less';
import classnames from 'classnames';

interface IProps {
  module: string;
  inboundRight?: boolean;
}

export default ({ module, inboundRight }: IProps) => {
  const count = getReadedCount({ module });

  return (
    <>
      {count > 0 && (
        <div className={classnames({
          [styles.circle]: true,
          [styles.inboundRight]: inboundRight
          })}>
          <Badge count={count} />
        </div>
      )}
    </>
  );
};
