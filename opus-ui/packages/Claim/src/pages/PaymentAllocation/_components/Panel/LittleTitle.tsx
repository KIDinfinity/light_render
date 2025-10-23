import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import DeleteButton from 'claim/components/DeleteButton';

import styles from './styles.less';

export interface ILittleTitle {
  title: ReactNode;
  hasPoint?: boolean;
  className?: string;
  children?: ReactNode;
  onClose?: React.MouseEventHandler<HTMLElement>;
  closable?: boolean;
  style?: React.CSSProperties;
}

const LittleTitle: FunctionComponent<ILittleTitle> = ({
  title,
  hasPoint,
  children,
  className,
  onClose = lodash.noop,
  closable,
  style,
}) => {
  return (
    <div className={styles.LittleTitle} style={style}>
      {closable && <DeleteButton handleClick={onClose} className={styles.PanelOtherDeleteWrap} />}
      <div
        className={classNames({ [styles.HasPoint]: hasPoint }, styles.LittleTextWrap, className)}
      >
        <span className={styles.LittleTextTitle}>{title && title}</span>
      </div>
      <div className={styles.LittleConte}>{children || null}</div>
    </div>
  );
};

export default LittleTitle;
