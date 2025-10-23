import React, { memo } from 'react';
import { Tooltip, Icon } from 'antd';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import styles from './index.less';

interface IProps {
  title?: string;
}

const ErrorTip = ({ title = 'Required!' }: IProps) => (
  <Tooltip overlayClassName={styles.errTip} title={title}>
    <Icon component={ErrorSvg} />
  </Tooltip>
);

export default memo(ErrorTip);
