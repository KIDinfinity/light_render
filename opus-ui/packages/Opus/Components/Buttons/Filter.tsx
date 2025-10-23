import React from 'react';
import classNames from 'classnames';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Button, Icon } from 'opus/Components/Antd';

import { ReactComponent as IconFilter } from 'opus/Assets/icon-filter.svg';

import styles from './index.less';

const Main = ({ handleClick, loading = false, iconTransformRotate90deg = true }: any) => {
  return (
    <div className={classNames(styles.button, styles.default)}>
      <Button
        loading={loading}
        onClick={() => {
          handleClick();
        }}
        className={styles.button}
      >
        <Icon
          component={IconFilter}
          className={classNames(styles.buttonIcon, {
            [styles.iconTransformRotate90deg]: iconTransformRotate90deg,
          })}
        />
        {formatMessageApi({ Label_BPM_Button: 'Filter' })}
      </Button>
    </div>
  );
};

export default Main;
