import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import DeleteButton from 'claim/components/DeleteButton';

import styles from './styles.less';

export interface IBackLine {
  children?: ReactNode;
  className?: string;
  onClose?: React.MouseEventHandler<HTMLElement>;
  closable?: boolean;
  style?: React.CSSProperties;
}

const BackLine: FunctionComponent<IBackLine> = ({
  children,
  className,
  onClose = lodash.noop,
  closable,
  style,
}) => {
  return (
    <div className={classNames(styles.BackLine, className)} style={style}>
      {closable && <DeleteButton handleClick={onClose} className={styles.PanelOtherDeleteWrap} />}
      {children || null}
    </div>
  );
};

export default BackLine;
