import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import DeleteButton from 'claim/components/DeleteButton';

import styles from './styles.less';

export interface IBackColor {
  children?: ReactNode;
  className?: string;
  onClose?: React.MouseEventHandler<HTMLElement>;
  closable?: boolean;
  style?: React.CSSProperties;
}

const BackColor: FunctionComponent<IBackColor> = React.forwardRef(
  ({ children, className, onClose = lodash.noop, closable, style }, ref) => {
    return (
      <div className={classNames(styles.BackColor, className)} style={style} ref={ref}>
        {closable && <DeleteButton handleClick={onClose} className={styles.PanelOtherDeleteWrap} />}
        {children || null}
      </div>
    );
  }
);

export default BackColor;
