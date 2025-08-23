import type { FunctionComponent, ReactNode } from 'react';
import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import Btn from 'claim/components/Button';
import styles from './styles.less';

export interface IBackColor {
  children?: ReactNode;
  className?: string;
  onClose?: React.MouseEventHandler<HTMLElement>;
  closable?: boolean;
  style?: React.CSSProperties;
}

const BackColor: FunctionComponent<IBackColor> = React.forwardRef(
  ({ children, className, onClose = lodash.noop, closable, style, addable, onAdd }, ref) => {
    return (
      <div className={classNames(styles.BackColor, className)} style={style} ref={ref}>
        {closable && (
          <Btn.DeleteButton handleClick={onClose} className={styles.PanelOtherDeleteWrap} />
        )}
        {addable && (
          <Btn.AddButton
            handleClick={onAdd}
            icon="plus"
            className={styles.PanelOtherAddWrap}
            shape="circle"
            size="small"
          />
        )}
        {children || null}
      </div>
    );
  }
);

export default BackColor;
