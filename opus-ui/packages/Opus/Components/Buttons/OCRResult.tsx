import React from 'react';
import classNames from 'classnames';
import { Button } from 'opus/Components/Antd';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';
import styles from './index.less';

const Main = ({ handleClick, loading = false, disabled = false }: any) => {
  return (
    <div className={classNames(styles.button, styles.default)}>
      <Button
        loading={loading}
        disabled={disabled}
        onClick={() => {
          handleClick();
        }}
        className={styles.button}
      >
        {t('OCRResult')}
      </Button>
    </div>
  );
};

export default Main;
