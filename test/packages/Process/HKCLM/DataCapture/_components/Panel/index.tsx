import type { FunctionComponent, ReactNode, CSSProperties } from 'react';
import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import DeleteButton from 'claim/components/DeleteButton';
import type { IBackColor } from './BackColor';
import BackColor from './BackColor';
import type { IBackLine } from './BackLine';
import BackLine from './BackLine';
import type { ILittleTitle } from './LittleTitle';
import LittleTitle from './LittleTitle';

import styles from './styles.less';

interface IProps {
  title: string;
  className?: string;
  styleContent?: CSSProperties;
  children?: ReactNode;
  onClose?: React.MouseEventHandler<HTMLElement>;
  closable?: boolean;
}

interface IPanel extends FunctionComponent<IProps> {
  BackColor: FunctionComponent<IBackColor>;
  BackLine: FunctionComponent<IBackLine>;
  LittleTitle: FunctionComponent<ILittleTitle>;
}

const Panel: IPanel = React.forwardRef(
  ({ title, className, styleContent, children, onClose = lodash.noop, closable }, ref) => {
    return (
      <div className={classNames(styles.Panel, className)} ref={ref}>
        {closable && <DeleteButton handleClick={onClose} className={styles.PanelDeleteWrap} />}
        <div className={classNames(styles.PanelTitle, 'PanelTitle')}>
          <span className={styles.textTitle}>{title && title}</span>
        </div>
        <div className={classNames(styles.PanelConte, 'PanelConte')} style={styleContent}>
          {children || null}
        </div>
      </div>
    );
  }
);

Panel.BackColor = BackColor;
Panel.BackLine = BackLine;
Panel.LittleTitle = LittleTitle;

export default Panel;
