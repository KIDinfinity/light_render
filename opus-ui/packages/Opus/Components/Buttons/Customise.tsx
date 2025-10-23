import React from 'react';
import classNames from 'classnames';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Button, Icon } from 'opus/Components/Antd';
import { ReactComponent as reportCustomise } from 'packages/Opus/Assets/icon-report-customise.svg';

import styles from './index.less';

const Main = ({ handleClick, loading = false }: any) => {
  return (
    <div className={classNames(styles.button, styles.default)}>
      <Button
        loading={loading}
        onClick={() => {
          handleClick();
        }}
        className={styles.button}
      >
        <Icon component={reportCustomise} className={styles.buttonIcon} />
        {formatMessageApi({ Label_BPM_Button: 'Customise' })}
      </Button>
    </div>
  );
};

export default Main;
