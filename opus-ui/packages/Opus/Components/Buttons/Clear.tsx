import React from 'react';
import classNames from 'classnames';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Button } from 'opus/Components/Antd';

import styles from './index.less';

const Main = ({ handleClear, defaultStyle = false, loading = false }: any) => {
  return (
    <div className={classNames(styles.button, !!defaultStyle ? styles.default : styles.noShadow)}>
      <Button
        loading={loading}
        onClick={(e) => {
          handleClear(e);
        }}
      >
        {formatMessageApi({ Label_BPM_Button: 'Clear' })}
      </Button>
    </div>
  );
};

export default Main;
