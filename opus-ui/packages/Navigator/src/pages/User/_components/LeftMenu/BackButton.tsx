import React from 'react';
import { Icon } from 'antd';
import { history } from 'umi';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as backSvg } from 'bpm/assets/back.svg';
import styles from './BackButton.less';

export default () => {
  return (
    <div className={classNames(styles.backBox, 'backBox')} onClick={() => history.go(-1)}>
      <Icon component={backSvg} />
      <span>
        {formatMessageApi({
          Label_BPM_Button: 'component.button.return',
        })}
      </span>
    </div>
  );
};
