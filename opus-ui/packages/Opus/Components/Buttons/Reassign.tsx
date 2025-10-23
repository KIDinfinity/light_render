import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import { Button, Icon } from 'opus/Components/Antd';
import { ReactComponent as swap } from 'packages/Opus/Assets/icon-swap.svg';
import React from 'react';
import styles from './index.less';

const Main = ({ disabled, handleClick }: any) => {
  return (
    <div className={classNames(styles.button, styles.default)}>
      <Button
        disabled={disabled}
        onClick={() => {
          handleClick();
        }}
        className={styles.button}
      >
        <Icon component={swap} className={styles.buttonIcon} />
        {formatMessageApi({ Label_BPM_Button: 'Reassign' })}
      </Button>
    </div>
  );
};

export default Main;
