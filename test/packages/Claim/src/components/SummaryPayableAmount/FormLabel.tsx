import type { FunctionComponent } from 'react';
import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';

import styles from './styles.less';

interface IProps {
  labelText?: string;
  labelIconText?: string;
  className?: string;
  show?: boolean;
}

const FormLabel: FunctionComponent<IProps> = ({ labelText, labelIconText, className, show }) => {
  return (
    <span className={classNames('formLabel', styles.formLabel, className)}>
      <span className={styles.formLabelText}>{labelText}</span>
      {show && (
        <span className={styles.formLabelIcon}>
          <Icon type="sync" />
          <span className={styles.labelIconText}>{labelIconText}</span>
        </span>
      )}
    </span>
  );
};

export default FormLabel;
