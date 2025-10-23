import React from 'react';
import classNames from 'classnames';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Button, Icon } from 'opus/Components/Antd';

import { ReactComponent as IconVector } from 'opus/Assets/icon-vector.svg';

import styles from './index.less';

const Main = ({ loading, defaultStyle = true, handleClick, disabled }: any) => {
  return (
    <div className={classNames(styles.button, !!defaultStyle ? styles.default : styles.noShadow)}>
      <Button
        loading={loading}
        onClick={() => {
          handleClick();
        }}
        className={styles.button}
        disabled={disabled}
      >
        {loading ? (
          <span className={styles.buttonIcon} />
        ) : (
          <Icon component={IconVector} className={styles.buttonIcon} />
        )}
        {formatMessageApi({ Label_BPM_Button: 'Export' })}
      </Button>
    </div>
  );
};

export default Main;
