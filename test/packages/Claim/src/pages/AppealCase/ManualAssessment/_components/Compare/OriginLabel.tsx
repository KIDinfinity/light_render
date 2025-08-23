import type { FunctionComponent } from 'react';
import React from 'react';
import classNames from 'classnames';
import { ReactComponent as OriginLabelComponent } from './originLabelBg.svg';

import styles from './styles.less';

interface IProps {
  labelText?: string;
  className?: string;
}

const OriginLabel: FunctionComponent<IProps> = ({ labelText, className }) => {
  return (
    <div className={classNames('originLabel', styles.originLabel, className)}>
      <div className={styles.originLabelInner}>
        <OriginLabelComponent />
        <span className={styles.originLabelText}>{labelText}</span>
      </div>
    </div>
  );
};

export default OriginLabel;
