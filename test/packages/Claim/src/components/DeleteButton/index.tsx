import type { FunctionComponent } from 'react';
import React from 'react';
import { Button } from 'antd';
import classsNames from 'classnames';
import styles from './index.less';

interface IProps {
  handleClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

const DeleteButton: FunctionComponent<IProps> = ({ handleClick, className }) => (
  <div className={classsNames(styles.buttonWrap, className)}>
    <Button
      className={styles.deleteBtn}
      icon="close"
      size="small"
      type="primary"
      shape="circle"
      onClick={handleClick}
    />
  </div>
);

export default DeleteButton;
