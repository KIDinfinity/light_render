import React, { memo } from 'react';
import { Tooltip, Icon } from 'antd';
import lodash from 'lodash';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import styles from './LabelTip.less';

interface IProps {
  title: any;
  placement?: string;
}

const LabelTip = ({ title, placement = 'top', children }: IProps) => (
  <Tooltip
    overlayClassName={styles.errTip}
    placement={placement}
    title={
      <>
        {lodash.map(title, (text: string, idx: number) => (
          <p key={`tip_${idx}`}>{text}</p>
        ))}
      </>
    }
  >
    {children || <Icon component={ErrorSvg} />}
  </Tooltip>
);

export default memo(LabelTip);
