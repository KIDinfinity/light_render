import type { FunctionComponent } from 'react';
import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';

import styles from './styles.less';

interface IProps {
  children?: React.ReactNode;
  horizontal?: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
  onMouseHover: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
  expanded?: boolean;
}

const TriggerButton: FunctionComponent<IProps> = ({
  children,
  horizontal,
  onClick,
  // onMouseHover,
  // onMouseLeave,
  expanded,
}) => {
  return (
    <div>
      <Button
        type="primary"
        block
        icon={expanded ? 'double-right' : 'double-left'}
        onClick={(e) => onClick(e)}
        // onMouseOver={(e) => onMouseHover(e)}
        // onMouseLeave={(e) => onMouseLeave(e)}
        className={classNames(
          { [styles.horizontal]: horizontal, [styles.vertical]: !horizontal },
          styles.triggerButton
        )}
      >
        {children}
      </Button>
    </div>
  );
};

export default TriggerButton;
