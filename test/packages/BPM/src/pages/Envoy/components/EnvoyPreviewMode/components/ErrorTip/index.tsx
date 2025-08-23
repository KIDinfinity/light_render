import React, { memo } from 'react';
import { Tooltip, Icon } from 'antd';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import styles from './index.less';

interface IProps {
  title?: string;
  className?: any;
}

const ErrorTip = ({ title = 'Required!', className }: IProps) => (
  <Tooltip defaultVisible overlayClassName={styles.errTip} title={title}>
    <Icon component={ErrorSvg} className={className} />
  </Tooltip>
);

export default memo(ErrorTip);
